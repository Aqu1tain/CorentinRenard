# Backend de corentinrenard.com

Ce dossier contient le backend de corentinrenard.com, une application développée avec Express.js et MongoDB pour fournir des fonctionnalités d'API REST.

## Structure du dossier

- `controllers/`: Contient les contrôleurs de l'application qui gèrent la logique métier pour chaque route.
- `models/`: Contient les modèles de données de l'application qui définissent la structure des données.
- `routes/`: Contient les routes de l'application qui définissent les endpoints de l'API.
- `middlewares/`: Contient les middlewares de l'application, tels que la gestion des erreurs, l'authentification, etc.
- `utils/`: Contient des utilitaires ou des fonctions réutilisables utilisés dans l'application.
- `app.js`: Point d'entrée de l'application. Configure et lance le serveur Express.js.
- `config.js`: Fichier de configuration de l'application, contenant les informations de connexion à la base de données, les clés secrètes, etc.

## Prérequis

Avant de démarrer le backend, assurez-vous d'avoir Node.js et MongoDB installés sur votre machine.

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Exécutez `npm install` pour installer les dépendances.
3. Configurez les informations de connexion à la base de données dans le fichier `config.js`.
4. Exécutez `npm start` pour démarrer le serveur.

## Points d'entrée de l'API

- `/api/projects`: Endpoints pour gérer les projets.
- `/api/login`: Endpoint pour authentifier un utilisateur admin.
- `/api/logout`: Endpoint pour déconnecter un utilisateur admin.

## Contributions

Les contributions ne sont pas les bienvenues.