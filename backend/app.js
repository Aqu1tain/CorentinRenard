const { app, transporter } = require('./middleware');
const Post = require('./models/Post');
const Skill = require('./models/Skill'); // Import du modèle de compétence


// Route pour récupérer toutes les compétences
app.get('/api/skills', async (req, res) => {
  try {
      const skills = await Skill.find(); // Récupérer toutes les compétences depuis la base de données
      res.status(200).json(skills); // Envoyer les compétences au format JSON
  } catch (err) {
      res.status(500).json({ message: "Une erreur s'est produite lors de la recherche des skills : " + err.msg });
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


// Route pour créer un nouveau post
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

// Route pour récupérer tous les posts
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

// Route pour supprimer un post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Post supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du post :', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du post.' });
  }
})

//route pour modifier un post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Post mis à jour avec succès.', post });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du post :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du post.' });
  }
})

//route pour envoyer un mail
app.post('/api/send-email', async (req, res) => {
  const { name, lastName, email, subject, message } = req.body;

  const mailOptions = {
    from: `"${name} ${lastName}" <${email}>`,
    to: 'corentinfox08@gmail.com',
    subject: subject === 'dont know yet' ? ['webdesign', 'webdev'] : subject,
    text: message
  }

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    const errorMessage = error.response ? await error.response.text() : error.message;
    console.error('Erreur lors de l\'envoi de l\'email :', errorMessage);
    res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
  }
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Serveur Express lancé sur le port ${port}`);
});
