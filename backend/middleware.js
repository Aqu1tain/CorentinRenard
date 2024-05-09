const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3c3c3ab1465883",
    pass: "07d8567b67c35f"
  }
});

// Utilisation du middleware CORS pour autoriser les requêtes provenant de tous les domaines
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/CorentinRenard')
.then(() => console.log('Connexion à MongoDB réussie'))
.catch(err => console.error('Erreur de connexion à MongoDB :', err));

// Middleware pour parser les requêtes au format JSON
app.use(express.json());


module.exports = { app, transporter };