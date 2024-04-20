const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Post = require('./models/Post');

const app = express();

// Utilisation du middleware CORS pour autoriser les requêtes provenant de tous les domaines
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));


// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/CorentinRenard')
.then(() => console.log('Connexion à MongoDB réussie'))
.catch(err => console.error('Erreur de connexion à MongoDB :', err));

// Middleware pour parser les requêtes au format JSON
app.use(express.json());

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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Serveur Express lancé sur le port ${port}`);
});

