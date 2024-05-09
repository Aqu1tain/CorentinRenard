import React, { useState, useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import './SkillsMenu.scss';

import CoLink from '../CoLink/CoLink';

const SkillsMenu = () => {
    const [selectedList, setSelectedList] = useState('designer');
    const [selectedImage, setSelectedImage] = useState(null);
    const [skills, setSkills] = useState(null);

    const [skillsIcons, setSkillsIcons] = useState(null);

    const timeline = useRef(null);

    useEffect(() => {
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
        timeline.current.play();
    }, [])

    useEffect(() => {
        fetch('http://localhost:3001/api/skills')
            .then(response => response.json())
            .then(data => {
                setSkills(data);
                // Set default selected image based on the selectedList
                const defaultImage = data.find(skill => skill.work === selectedList); 
                if (defaultImage) {
                    setSelectedImage(defaultImage.name);
                }
            })
            .catch(error => console.error("Erreur lors de la récupération des compétences : ", error));
    }, [selectedList]);

    const handleClick = useCallback(id => {
        setSelectedList(id);
        // Set default selected image when category is changed
        const defaultImage = skills.find(skill => skill.work === id);
        if (defaultImage) {
            setSelectedImage(defaultImage.name);
        }
    }, [skills]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };    

    return (
        <div className="skill-menu">
            <div className="choices">
                <div className='cache'>
                    <div className={`choice ${selectedList === 'designer' ? 'active' : ''}`} onClick={() => handleClick('designer')}>
                        <p>Comme Web Designer</p>
                    </div>
                </div>
                <div className='cache'>
                    <div className={`choice ${selectedList === 'frontend' ? 'active' : ''}`} onClick={() => handleClick('frontend')}>
                        <p>Comme Dev Frontend</p>
                    </div>
                </div>
                <div className='cache'>
                    <div className={`choice ${selectedList === 'backend' ? 'active' : ''}`} onClick={() => handleClick('backend')}>
                        <p>Comme Dev Backend</p>
                    </div>
                </div>
                <div className='filler' />
            </div>
            
            <div className={`skill-list ${selectedList}`}>
                <div className='technos'>
                    <ul>
                        {skills && skills
                            .filter(skill => {
                                return skill.work === selectedList;
                            })
                            .map(skill => (
                                <li className={selectedImage === skill.name ? 'focus' : ''} key={skill._id}>
                                    <img 
                                        src={"http://localhost:3001/images/" + skill.imageid + ".png"}
                                        alt={skill.name}
                                        onClick={() => handleImageClick(skill.name)}
                                    />
                                </li>
                            ))}
                    </ul>
                </div>
                <div className={`explanation ${selectedImage ? 'focus' : ''}`}>
                    {selectedImage && (
                        <>
                            {skills.map(skill => {
                                if (skill.name === selectedImage) {
                                    return (
                                        <div key={skill._id}>
                                            <div className='image-title'>
                                                <img 
                                                    src={"http://localhost:3001/images/" + skill.imageid + ".png"} 
                                                    alt={skill.name} 
                                                />
                                                <h2>{skill.name}</h2>
                                            </div>
                                            <p>{skill.description}</p>
                                            <CoLink to={skill.link} target="_blank">En savoir plus</CoLink>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SkillsMenu;