import React, { useState, useCallback, useEffect } from 'react';

import './SkillsMenu.scss';

import Photoshop from '../../assets/images/photoshop.png';
import Illustrator from '../../assets/images/illustrator.png';
import Figma from '../../assets/images/figma.png';
import Penpaper from '../../assets/images/penpaper.png';
import CSS from '../../assets/images/css.png';
import HTML from '../../assets/images/html.png';
import Javascript from '../../assets/images/javascript.png';
import Reactjs from '../../assets/images/reactjs.png';
import Nodejs from '../../assets/images/nodejs.png';
import Php from '../../assets/images/php.png';
import Sass from '../../assets/images/sass.png';
import express from '../../assets/images/express.png';
import Mysql from '../../assets/images/mysql.png';
import python from '../../assets/images/python.png';
import MongoDB from '../../assets/images/mongodb.png';

import CoLink from '../CoLink/CoLink';
const imageDetails = {
    Photoshop: {
        title: 'Photoshop',
        p: 'Photoshop est un outil de traitement d’image et de graphisme numérique, développé par Adobe. Il permet de créer, modifier et retoucher des images, de les convertir entre différents formats, et de les utiliser dans des applications variées.',
        link: 'https://www.adobe.com/fr/products/photoshop.html',
    },
    Reactjs: {
        title: 'React.js',
        p: 'React est une bibliothèque JavaScript libre et open source pour générer des interfaces utilisateur. Elle a été créée et est maintenue par Facebook, Inc.',
        link: 'https://fr.reactjs.org/',
    },
    Nodejs: {
        title: 'Node.js',
        p: 'Node.js est un environnement d’exécution JavaScript en dehors du navigateur, permettant l’exécution de code côté serveur, grâce à l’utilisation de l’architecture événementielle et non bloquante.',
        link: 'https://nodejs.org/fr/',
    },
    MongoDB: {
        title: 'MongoDB',
        p: 'MongoDB est un système de gestion de base de données (SGDB) orientée documents, répartissable sur un nombre quelconque d\'ordinateurs et ne nécessitant pas de schéma prédéfini des données.',
        link: 'https://www.mongodb.com/',
    },
    Figma: {
        title: 'Figma',
        p: 'Figma est un outil de design d\'interface utilisateur basé sur le Web, qui permet à plusieurs personnes de collaborer en temps réel. Il offre des fonctionnalités de prototypage et de conception d\'interfaces utilisateur.',
        link: 'https://www.figma.com/',
    },
    HTML: {
        title: 'HTML',
        p: 'HTML (HyperText Markup Language) est le langage de balisage standard utilisé pour créer et structurer les pages Web et leurs contenus. Il définit la structure logique et visuelle d\'une page Web.',
        link: 'https://developer.mozilla.org/fr/docs/Web/HTML',
    },
    CSS: {
        title: 'CSS',
        p: 'CSS (Cascading Style Sheets) est un langage de feuille de style utilisé pour décrire la présentation visuelle d\'un document HTML. Il permet de contrôler l\'apparence et la mise en page des éléments d\'une page Web.',
        link: 'https://developer.mozilla.org/fr/docs/Web/CSS',
    },
    Javascript: {
        title: 'JavaScript',
        p: 'JavaScript est un langage de programmation de scripts principalement utilisé pour rendre les pages Web interactives et dynamiques. Il est largement utilisé dans le développement Web côté client.',
        link: 'https://developer.mozilla.org/fr/docs/Web/JavaScript',
    },
    Sass: {
        title: 'Sass',
        p: 'Sass est un préprocesseur CSS qui permet d\'ajouter des fonctionnalités supplémentaires, telles que les variables, les mixins et les fonctions, pour rendre le processus de développement CSS plus efficace et maintenable.',
        link: 'https://sass-lang.com/',
    },
    Python: {
        title: 'Python',
        p: 'Python est un langage de programmation interprété, de haut niveau, polyvalent et convivial. Il est largement utilisé dans divers domaines tels que le développement Web, l\'intelligence artificielle, la science des données, etc.',
        link: 'https://www.python.org/',
    },
    MySQL: {
        title: 'MySQL',
        p: 'MySQL est un système de gestion de base de données relationnelle open source. Il est largement utilisé pour stocker et gérer des données dans de nombreuses applications Web et logiciels.',
        link: 'https://www.mysql.com/',
    },
    PHP: {
        title: 'PHP',
        p: 'PHP est un langage de script côté serveur largement utilisé pour le développement Web. Il est principalement utilisé pour générer des pages Web dynamiques et interactives.',
        link: 'https://www.php.net/',
    },
    express: {
        title: 'Express.js',
        p: 'Express.js est un cadre d\'application Web Node.js minimal et flexible qui fournit un ensemble robuste de fonctionnalités pour développer des applications Web et des API.',
        link: 'https://expressjs.com/fr/',
    },
    python: {
        title: 'Python',
        p: 'Python est un langage de programmation interprété, de haut niveau, polyvalent et convivial. Il est largement utilisé dans divers domaines tels que le développement Web, l\'intelligence artificielle, la science des données, etc.',
        link: 'https://www.python.org/',
    },
    Mysql: {
        title: 'MySQL',
        p: 'MySQL est un système de gestion de base de données relationnelle open source. Il est largement utilisé pour stocker et gérer des données dans de nombreuses applications Web et logiciels.',
        link: 'https://www.mysql.com/',
    },
    express: {
        title: 'Express.js',
        p: 'Express.js est un cadre d\'application Web Node.js minimal et flexible qui fournit un ensemble robuste de fonctionnalités pour développer des applications Web et des API.',
        link: 'https://expressjs.com/fr/',
    },
    Php: {
        title: 'PHP',
        p: 'PHP est un langage de script côté serveur largement utilisé pour le développement Web. Il est principalement utilisé pour générer des pages Web dynamiques et interactives.',
        link: 'https://www.php.net/',
    },
    Illustrator: {
        title: 'Illustrator',
        p: 'Adobe Illustrator est un logiciel de création graphique vectorielle. Il est principalement utilisé pour la création de dessins, de logos et d\'illustrations de haute qualité.',
        link: 'https://www.adobe.com/fr/products/illustrator.html',
    },
    Penpaper: {
        title: 'Crayon et Papier',
        p: 'Le crayon et le papier sont des outils traditionnels utilisés par les artistes et les concepteurs pour esquisser des idées et créer des dessins avant de les numériser ou de les finaliser dans des logiciels de conception graphique.',
        link: 'https://fr.wikipedia.org/wiki/Crayon',
    },
};


const SkillsMenu = () => {
    const [selectedList, setSelectedList] = useState('designer');
    const [selectedImage, setSelectedImage] = useState(null);

    // Fonction pour sélectionner la première technologie de chaque catégorie par défaut
    useEffect(() => {
        if (selectedList === 'designer' && !selectedImage) {
            setSelectedImage('Photoshop');
        } else if (selectedList === 'frontend' && !selectedImage) {
            setSelectedImage('Reactjs');
        } else if (selectedList === 'backend' && !selectedImage) {
            setSelectedImage('Nodejs');
        }
    }, [selectedList, selectedImage]);

    const handleClick = useCallback(id => {
        setSelectedList(id);
        setSelectedImage(null);
    }, []);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <div className="skill-menu">
            <div className="choices">
                <div className='cache'>
                    <div className={`choice ${selectedList === 'designer' ? 'active' : ''}`} onClick={() => handleClick('designer')}>
                        <p>
                            Comme Web Designer
                        </p>
                    </div>
                </div>
                <div className='cache'>
                    <div className={`choice ${selectedList === 'frontend' ? 'active' : ''}`} onClick={() => handleClick('frontend')}>
                        <p>
                            Comme Dev Frontend
                        </p>
                    </div>
                </div>
                <div className='cache'>
                    <div className={`choice ${selectedList === 'backend' ? 'active' : ''}`} onClick={() => handleClick('backend')}>
                        <p>
                            Comme Dev Backend
                        </p>
                    </div>
                </div>
                <div className='filler' />
            </div>
            
            <div className={`skill-list ${selectedList}`}>
                <div className='technos'>
                    <ul>
                        {(selectedList === 'designer') && (
                            <>
                                <li className={selectedImage === 'Photoshop' ? 'focus' : ''}>
                                    <img
                                        src={Photoshop}
                                        alt="Photoshop"
                                        onClick={() => handleImageClick('Photoshop')}
                                    />
                                </li>
                                <li className={selectedImage === 'Illustrator' ? 'focus' : ''}>
                                    <img 
                                        src={Illustrator}
                                        alt="Illustrator"
                                        onClick={() => handleImageClick('Illustrator')}
                                    />
                                </li>
                                <li className={selectedImage === 'Figma' ? 'focus' : ''}>
                                    <img 
                                        src={Figma}
                                        alt="Figma"
                                        onClick={() => handleImageClick('Figma')}
                                    />
                                </li>
                                <li className={selectedImage === 'Penpaper' ? 'focus' : ''}>
                                    <img 
                                        src={Penpaper}
                                        alt="Crayon à papier"
                                        onClick={() => handleImageClick('Penpaper')}
                                    />
                                </li>
                            </>
                        )}
                        {(selectedList === 'backend') && (
                            <>
                                <li className={selectedImage === 'Nodejs' ? 'focus' : ''}>
                                    <img 
                                        src={Nodejs}
                                        alt="Node.js"
                                        onClick={() => handleImageClick('Nodejs')}
                                    />
                                </li>
                                <li className={selectedImage === 'MongoDB' ? 'focus' : ''}>
                                    <img 
                                        src={MongoDB}
                                        alt="MongoDB"
                                        onClick={() => handleImageClick('MongoDB')}
                                    />
                                </li>
                                <li className={selectedImage === 'Mysql' ? 'focus' : ''}>
                                    <img 
                                        src={Mysql}
                                        alt="MySQL"
                                        onClick={() => handleImageClick('Mysql')}
                                    />
                                </li>
                                <li className={selectedImage === 'python' ? 'focus' : ''}>
                                    <img 
                                        src={python}
                                        alt="Python"
                                        onClick={() => handleImageClick('python')}
                                    />
                                </li>
                                <li className={selectedImage === 'Php' ? 'focus' : ''}>
                                    <img 
                                        src={Php}
                                        alt="PHP"
                                        onClick={() => handleImageClick('Php')}
                                    />
                                </li>
                                <li className={selectedImage === 'express' ? 'focus' : ''}>
                                    <img 
                                        src={express}
                                        alt="Express.js"
                                        onClick={() => handleImageClick('express')}
                                    />
                                </li>
                            </>
                        )}
                        {(selectedList === 'frontend') && (
                            <>
                                <li className={selectedImage === 'Reactjs' ? 'focus' : ''}>
                                    <img 
                                        src={Reactjs}
                                        alt="React.js"
                                        onClick={() => handleImageClick('Reactjs')}
                                    />
                                </li>
                                <li className={selectedImage === 'Sass' ? 'focus' : ''}>
                                    <img 
                                        src={Sass}
                                        alt="Sass"
                                        onClick={() => handleImageClick('Sass')}
                                    />
                                </li>
                                <li className={selectedImage === 'HTML' ? 'focus' : ''}>
                                    <img 
                                        src={HTML}
                                        alt="Html"
                                        onClick={() => handleImageClick('HTML')}
                                    />
                                </li>
                                <li className={selectedImage === 'CSS' ? 'focus' : ''}>
                                    <img 
                                        src={CSS}
                                        alt="CSS"
                                        onClick={() => handleImageClick('CSS')}
                                    />
                                </li>
                                <li className={selectedImage === 'Javascript' ? 'focus' : ''}>
                                    <img 
                                        src={Javascript}
                                        alt="Javascript"
                                        onClick={() => handleImageClick('Javascript')}
                                    />
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <div className={`explanation ${selectedImage ? 'focus' : ''}`}>
                    {selectedImage && (
                        <>
                            <div className='image-title'>
                                <img 
                                    src={require(`../../assets/images/${selectedImage.toLowerCase()}.png`)} 
                                    alt={imageDetails[selectedImage].title} 
                                />
                                <h2>{imageDetails[selectedImage].title}</h2>
                            </div>
                            <p>{imageDetails[selectedImage].p}</p>
                            <CoLink to={imageDetails[selectedImage].link} target="_blank">En savoir plus</CoLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SkillsMenu;
