import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import AdminJS from 'adminjs';
import * as AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';

import { transporter } from './middleware.js';
import { Post } from './models/Post.js';
import { Skill } from './models/Skill.js';
import { User } from './models/User.js';

dotenv.config(); /* Load environment variables */

const PORT = process.env.PORT || 3001;
const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const MongoStore = connectMongo.create({
  mongoUrl: process.env.MONGODB_URL,
  collection: 'sessions',
});

AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  resources: [
    {
      resource: Post,
      options: {
        properties: {
          content: { type: 'richtext' },
          clientComment: { type: 'richtext' },
        },
      },
    },
    { resource: Skill, options: {} },
    {
      resource: User,
      options: {
        properties: {
          password: {
            type: 'password',
            isVisible: { list: false, filter: false, show: true, edit: true },
          },
          encryptedPassword: {
            type: 'string',
            isVisible: { list: false, filter: false, show: false, edit: true },
          },
          id: {
            isVisible: { list: false, filter: false, show: true, edit: true },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                  password: undefined,
                };
              }
              return request;
            },
          },
        },
      },
    },
  ],
  rootPath: '/admin',
});

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return DEFAULT_ADMIN;
  }
  return null;
};

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate,
    cookieName: 'adminjs',
    cookiePassword: process.env.COOKIE_SECRET,
  },
  null,
  {
    store: MongoStore,
    resave: true,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24,
    },
    name: 'adminjs',
  }
);

const app = express();
app.use(helmet()); /* Helmet configuration : used for security headers */
app.use(morgan('combined')); /* Logging configuration */
app.use(fileUpload()); /* Middleware to handle file uploads */

// Serve static files from 'utils/images'
app.use('/images', express.static(path.join(__dirname, 'utils', 'images')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(adminJs.options.rootPath, adminRouter);

// Image upload endpoint
app.post('/api/images', (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const file = req.files.file;
  file.mv(path.join(__dirname, 'utils', 'images', file.name), err => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json({ fileName: file.name, filePath: `/images/${file.name}` });
  });
});

// Skill endpoints
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (err) {
    console.error('Error fetching skills:', err);
    res.status(500).json({ message: 'Error fetching skills: ' + err.message });
  }
});

app.post('/api/skills', async (req, res) => {
  const skill = new Skill(req.body);
  try {
    await skill.save();
    res.status(201).json({ message: 'Skill created successfully.', skill });
  } catch (err) {
    console.error('Error creating skill:', err);
    res.status(500).json({ message: 'Error creating skill: ' + err.message });
  }
});

app.delete('/api/skills/:id', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Skill deleted successfully.' });
  } catch (err) {
    console.error('Error deleting skill:', err);
    res.status(500).json({ message: 'Error deleting skill: ' + err.message });
  }
});

app.put('/api/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Skill updated successfully.', skill });
  } catch (err) {
    console.error('Error updating skill:', err);
    res.status(500).json({ message: 'Error updating skill: ' + err.message });
  }
});

// Post endpoints
app.post('/api/posts', async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json({ message: 'Post created successfully.', post });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Error creating post: ' + err.message });
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Error fetching posts: ' + err.message });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Post deleted successfully.' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Error deleting post: ' + err.message });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Post updated successfully.', post });
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ message: 'Error updating post: ' + err.message });
  }
});

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  const { name, lastName, email, subject, message } = req.body;

  const mailOptions = {
    from: `"${name} ${lastName}" <${email}>`,
    to: 'corentinfox08@gmail.com',
    subject: subject === 'dont know yet' ? ['webdesign', 'webdev'] : subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ message: 'Error sending email: ' + err.message });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});