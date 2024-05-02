import React, { useState, useEffect } from 'react';
import CoLink from '../CoLink/CoLink';
import { gsap, TweenLite } from 'gsap';
import './ProjetsCompo.scss';

export default function ProjetsCompo() {
    const [projects, setProjects] = useState([]);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        fetch('http://localhost:3001/api/posts')
            .then(response => response.json())
            .then(data => setProjects(data));
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const timeline = gsap.timeline({ paused: true, defaults: { duration: 0.5, ease: 'power1.out' } });

    useEffect(() => {
        projects.forEach((project, index) => {
            timeline.fromTo(`.projetscompo .project:nth-child(${index + 1})`, { y: 20, opacity: 0, transform: 'none' }, { y: 0, opacity: 1 })
                .fromTo(`.projetscompo .project:nth-child(${index + 1}) .project-title`, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, index * 0.1)
                .fromTo(`.projetscompo .project:nth-child(${index + 1}) .project-sitetype`, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, index * 0.1)
                .fromTo(`.projetscompo .project:nth-child(${index + 1}) .CoLink`, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, index * 0.1);
        });
        timeline.play();
    }, [projects]);

    TweenLite.set(".project", {clearProps:"transform"}); 

    return (
        <div className='projetscompo'>
            {projects.map(project => (
                <div key={project._id} className="project">
                    <h2 className="project-title">{project.title}</h2>
                    <p className="project-sitetype">{project.sitetype}</p>
                    <CoLink
                        to={"projects/" + project.textid}
                        target={"_blank"}>
                        En savoir plus
                    </CoLink>
                    <img 
                        className="mouse-follower" 
                        src={project.imageUrl}
                        style={{
                            top: cursorPosition.y,
                            left: cursorPosition.x
                        }}
                    />
                </div>
                
            ))}
        </div>
    );
}

