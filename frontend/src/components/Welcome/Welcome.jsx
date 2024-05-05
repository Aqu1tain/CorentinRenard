import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './Welcome.scss';
import CoLink from '../CoLink/CoLink';
import Socials from '../Socials/Socials';

export default function Welcome() {
    useEffect(() => {
        const tl = gsap.timeline({ paused: false, defaults: { duration: 0.5, ease: 'power1.out' } });

        tl.fromTo('.presentation h3', { y: '50%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.3 })
            .fromTo('.presentation h1', { y: '50%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.3, ease: 'power2.out' }, '-=1')
            .fromTo('.presentation p', { y: '50%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.3, ease: 'power2.out' }, '-=1')
            .fromTo('.presentation a', { y: '50%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.3, ease: 'power2.out' }, '-=1')
            .fromTo('.presentation .social-links', { y: '50%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.3, ease: 'power2.out' }, '-=1')
            .set('.co-link', { transition: '0.5s' }, '-=0.2');
    }, []);

    
    
    return (
        <div className="welcome">
            <div className='presentation'>
                <h3>Bonjour 👋 je suis</h3>
                <h1>Corentin Renard</h1>
                <p>J’ai 18 ans et je suis développeur web freelance depuis mes 16 ans. <br />
                    Passionné par l'informatique et le design, je suis spécialisé dans la création de sites web pour aider les PME et les particuliers à se démarquer en ligne. J'offre des solutions de conception de sites web de qualité, avec une expérience client personnalisée et conviviale.
                </p>
                <CoLink to='/about'>En savoir plus</CoLink>
                <Socials />
            </div>
        </div>
    );
}


