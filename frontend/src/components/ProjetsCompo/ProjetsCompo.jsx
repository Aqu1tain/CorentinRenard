import React, { useState, useEffect } from 'react';
import CoLink from '../CoLink/CoLink';
import gsap from 'gsap';
import './ProjetsCompo.scss';

export default function ProjetsCompo() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/posts')
            .then(response => response.json())
            .then(data => setProjects(data));
    }, []);

    const timeline = gsap.timeline({ paused: true, defaults: { duration: 0.5, ease: 'power1.out' } });

    useEffect(() => {
        projects.forEach((project, index) => {
            timeline.fromTo(`.projetscompo .project:nth-child(${index + 1})`, { y: 20, opacity: 0 }, { y: 0, opacity: 1 })
                .fromTo(`.projetscompo .project:nth-child(${index + 1}) .project-title`, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, index * 0.1)
                .fromTo(`.projetscompo .project:nth-child(${index + 1}) .project-sitetype`, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, index * 0.1)
                .fromTo(`.projetscompo .project:nth-child(${index + 1}) .CoLink`, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, index * 0.1);
        });
        timeline.play();
    }, [projects]);

    useEffect(() => {
        const mouseFollowers = document.querySelectorAll('.mouse-follower');
        mouseFollowers.forEach(mouseFollower => {
            const updatePosition = e => {
                const rect = mouseFollower.parentElement.getBoundingClientRect();
                const x = e.clientX - rect.left - mouseFollower.width / 2;
                const y = e.clientY - rect.top - mouseFollower.height / 2;
                gsap.to(mouseFollower, { x, y, ease: 'power1.inOut' });
            };
            document.addEventListener('mousemove', updatePosition);
            return () => document.removeEventListener('mousemove', updatePosition);
        });
    }, []);


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
                        src={project.imageUrl}></img>
                </div>
            ))}
        </div>
    );
}