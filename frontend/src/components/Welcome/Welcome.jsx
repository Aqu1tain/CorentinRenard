import React from 'react';
import './Welcome.scss';
import CoLink from '../CoLink/CoLink';
import Socials from '../Socials/Socials';
export default function Welcome() {
    return (
        <div className="welcome">
            <div className='presentation'>
                <h3>Bonjour 👋 je suis</h3>
                <h1>Corentin Renard</h1>
                <p>J’ai 18 ans et je suis développeur web freelance depuis mes 16 ans. <br />
                    Passionné par l'informatique et le design, je suis spécialisé dans la création de sites web pour aider les PME et les particuliers à se démarquer en ligne. J'offre des solutions de conception de sites web de qualité, avec une expérience client personnalisée et conviviale.
                </p>
                <CoLink to='/about' target='_blank'>En savoir plus</CoLink>
                <Socials />
            </div>
        </div>
    );
}