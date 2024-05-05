import React, { useEffect } from 'react';
import { gsap } from 'gsap';

import Header from '../../components/Header/Header';

import CoLink from '../../components/CoLink/CoLink';

import './Aboutme.scss';

export default function Aboutme() {
    useEffect(() => {
        const tl = gsap.timeline({ paused: false, defaults: { duration: 0.5, ease: 'power1.out' } });

        tl.fromTo('.about-container .about-content h3', { y: '50%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.3 })
            .fromTo('.about-container .about-content h1', { y: '50%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.3, ease: 'power2.out' }, '-=1')
            .fromTo('.about-container .about-content .text1', { y: '50%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.3, ease: 'power2.out' }, '-=1')
            .fromTo('.about-container .about-content .text2', { y: '50%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.3, ease: 'power2.out' }, '-=1')
            .fromTo('.about-container .about-content .text3', { y: '50%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.3, ease: 'power2.out' }, '-=1')
            .fromTo('.about-container .about-content a', { y: '50%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.3, ease: 'power2.out' }, '-=1')
            .set('.co-link', { transition: '0.5s' }, '-=0.2');
    }, []);

    return (
        <div className="aboutme-page">
            <Header />
            <div className="about-container">
                <div className="about-content">
                    <h1>A propos de moi</h1>
                    <p className="text1">
                        Bonjour 👋, je suis Corentin Renard, j'ai 18 ans et je suis développeur web freelance depuis mes 16 ans.
                        Depuis tout petit j'aime construire des choses, en commencant par les kaplas et les legos. En grandissant, mes parents m'ont fait découvrir l'informatique avec Scratch. Coup de foudre immédiat ! Assembler des blocs et obtenir des résultats, c'est ce que j'aime.
                    </p>
                    <p className="text2">
                        Plus tard je rentre dans le code avec Visual Basic 2010, qui me fait faire mes premières applications. J'expérimente toujours plus de    languages, du Python, à Javascript en passant par Lua. 
                     </p>
                    <p className="text3"> 
                        Ayant aquis de solides compétences en programmation, je décide de me lancer   comme freelance 🚀 à 16 ans, tout en jonglant avec mes cours de première.
                        Nourri de dizaines de passions, qui peuvent parfois être éphémères, j'en trouve quand même quelques unes qui me restent : <br />
                        Faire des trucs sur des ordis, apprendre des langues, de nouvelles choses.
                        C'est ce que j'aime. Maintenant en première année de Bachelor, je continue sur ce chemin ! 📚 
                    </p>
                    <CoLink to="/contact">Demander un devis</CoLink>
                </div>
            </div>
        </div>
    );
}
