import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '3c3c3ab1465883',
    pass: '07d8567b67c35f',
  },
});

// Middleware pour parser les requêtes au format JSON
app.use(express.json());

export { app, transporter };