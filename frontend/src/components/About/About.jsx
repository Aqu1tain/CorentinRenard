import React from 'react';
import './About.scss';
import Button from '../Button/Button';

export default function About() {
    const today = new Date();
    const birthDate = new Date(2006, 3, 19); // April 19, 2006 (0-indexed month)
    const age = Math.floor((today - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
    return (
        <div className="about">
            <h1 className="title">À propos de moi</h1>
            <p className="text">
            Je suis Corentin Renard, j’ai {age} ans et je suis développeur web freelance depuis mes 16 ans.
            </p>
            <p>
            Passionné par l'informatique et le design, je suis spécialisé dans la création de sites web pour aider les petites et moyennes entreprises et les particuliers à se démarquer en ligne. J'offre des solutions de conception de sites web abordables et de qualité, avec une expérience client personnalisée et conviviale.
            </p>
            <p>
            Avec mes compétences pratiques et mon expérience, je suis constamment à la recherche des dernières tendances et technologies pour offrir des sites web modernes, esthétiquement attrayants et avec une expérience utilisateur optimale. Contactez-moi dès maintenant pour donner vie à votre projet de site web ! <br /><br />
            </p>
            <Button onClick={() => window.location = '/contact'}>Me contacter</Button>
        </div>
    );
}