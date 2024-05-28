import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { app, transporter } from './middleware.js';
import { Post } from './models/Post.js';
import { Skill } from './models/Skill.js';
import { User } from './models/User.js';
import bcrypt from 'bcrypt';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import AdminJS from 'adminjs';
import * as AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3001;
const DEFAULT_ADMIN = {
  email: 'admin@localhost',
  password: 'admin'
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://corentin-webmaster:L4dg5A3WNxR4x49UrTut5@corentinrenard.1sgdnin.mongodb.net/?retryWrites=true&w=majority&appName=CorentinRenard')
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(err => console.error('Erreur de connexion à MongoDB :', err));

const MongoStore = connectMongo.create({
  mongoUrl: process.env.MONGODB_URL || 'mongodb+srv://corentin-webmaster:L4dg5A3WNxR4x49UrTut5@corentinrenard.1sgdnin.mongodb.net/?retryWrites=true&w=majority&appName=CorentinRenard',
  collection: 'sessions',
});

AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  resources: [
    {
      resource: Post,
      options: {
        properties: {
          content: {
            type: 'richtext',
          },
          clientComment: {
            type: 'richtext',
          },
        },
      }
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
            after: async (response, request, context) => {
              if (request.payload.encryptedPassword) {
                console.log("Password was encrypted: ", request.payload.encryptedPassword);
              } else {
                console.log("Password encryption failed.");
              }
              return response;
            },
          },
        }
      }
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
    cookiePassword: 'secret'
  },
  null,
  {
    store: MongoStore,
    resave: true,
    saveUninitialized: true,
    secret: 'secret',
    cookie: {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
    },
    name: 'adminjs',
  }
);

app.use(adminJs.options.rootPath, adminRouter);
app.use('/images', express.static(path.join(__dirname, 'utils', 'images')));

app.post('/api/images', (req, res) => {
  const file = req.files.file;
  file.mv(path.join(__dirname, 'utils', 'images', file.name), err => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json({ fileName: file.name, filePath: `/images/${file.name}` });
  });
});

app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
    console.log("Requete recue : ", skills);
  } catch (err) {
    res.status(500).json({ message: "Une erreur s'est produite lors de la recherche des skills : " + err.msg });
    console.log("Requete echouée");
  }
});

app.post('/api/skills', async (req, res) => {
  const skill = new Skill(req.body);
  console.log(req.body);
  try {
    await skill.save();
    res.status(201).json({ message: 'Skill créé avec succès.', skill });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Erreur lors de la création du skill : ' + err.msg });
  }
});

app.delete('/api/skills/:id', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Skill supprimé avec succès.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression du skill : ' + err.msg });
  }
});

app.put('/api/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Skill mis à jour avec succès.', skill });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du skill : ' + err.msg });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json({ message: 'Post créé avec succès.', post });
  } catch (error) {
    console.error('Erreur lors de la création du post :', error);
    res.status(500).json({ error: 'Erreur lors de la création du post.' });
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
    console.log("Requete recue : ", posts);
  } catch (error) {
    console.error('Erreur lors de la récupération des posts :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des posts.' });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Post supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du post :', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du post.' });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Post mis à jour avec succès.', post });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du post :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du post.' });
  }
});

app.post('/api/send-email', async (req, res) => {
  const { name, lastName, email, subject, message } = req.body;

  const mailOptions = {
    from: `"${name} ${lastName}" <${email}>`,
    to: 'corentinfox08@gmail.com',
    subject: subject === 'dont know yet' ? ['webdesign', 'webdev'] : subject,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    const errorMessage = error.response ? await error.response.text() : error.message;
    console.error('Erreur lors de l\'envoi de l\'email :', errorMessage);
    res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur Express et AdminJS lancé sur le port ${PORT}`);
});
