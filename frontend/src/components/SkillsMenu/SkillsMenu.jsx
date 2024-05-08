import React, { useState, useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

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



const SkillsMenu = () => {
    const [selectedList, setSelectedList] = useState('designer');
    const [selectedImage, setSelectedImage] = useState(null);

    const timeline = useRef(null);

    useEffect(() => {
        /* First UseEffect to declare anims and initiate timeline */
        timeline.current = gsap.timeline({ 
            paused: true, 
            defaults: { 
                duration: 0.5, 
                ease: 'power1.out' }
            }
        )
        .fromTo('.skill-menu', {
            y: 20,
            opacity: 0,
            transform : 'none'
        },
        {
            y: 0,
            opacity: 1,
        })
        .set('.co-link', { transition: '0.5s' });
        document.querySelectorAll('.choice p').forEach(p => {
            timeline.current.fromTo(p, {
                y: 10,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration:.4,
            })
        });
        return () => timeline.current.kill();
    }, []);

    useEffect(() => {
        /* Second UseEffect to play Timeline */
        timeline.current.play();
    }, [])

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

    const [skills, setSkills] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/api/skills')
            .then(response => response.json())
            .then(skillsData => {
                setSkills(skillsData);
            });
    }, []);

    

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
                                    alt="None" 
                                />
                                <h2>{selectedImage}</h2>
                            </div>
                            <p>Desc</p>
                            <CoLink to="#" target="_blank">En savoir plus</CoLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SkillsMenu;