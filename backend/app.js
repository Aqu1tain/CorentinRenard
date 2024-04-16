const express = require('express');

// Import des middlewares
const errorHandler = require('./middlewares/errorHandler');
const authenticateAdmin = require('./middlewares/authenticateAdmin');
const validateData = require('./middlewares/validateData');
const authorizeUser = require('./middlewares/authorizeUser');

const app = express();

// Middleware pour parser les requêtes au format JSON
app.use(express.json());

app.use(errorHandler);

app.use('/admin', authenticateAdmin);

app.post('/api/projects', validateData, (req, res) => {
  res.status(201).json({ message: 'Projet créé avec succès.' }); //provisoire
});

app.get('/api/users/:userId', authorizeUser, (req, res) => {
  res.status(200).json({ message: 'Utilisateur authentifié.' }); //provisoire
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Serveur Express lancé sur le port ${port}`);
});
