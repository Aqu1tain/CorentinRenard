import React, { useState, useEffect } from 'react';
import CoLink from '../CoLink/CoLink';
import { gsap } from 'gsap'; // GSAP: GreenSock Animation Platform
import './ProjetsCompo.scss';

export default function ProjetsCompo() {
    const [projects, setProjects] = useState([]); // Store the projects in state
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 }); // Store the mouse position

    useEffect(() => {
        fetch('http://localhost:3001/api/posts') // Fetch the projects from the API
            .then(response => response.json()) // Parse the response as JSON
            .then(data => setProjects(data)); // Store the projects in state
    }, []); // Run the effect only once, on mount

    useEffect(() => {
        const handleMouseMove = (e) => { // Handle the mouse move event
            setCursorPosition({ x: e.clientX, y: e.clientY }); // Update the mouse position state
        };

        document.addEventListener('mousemove', handleMouseMove); // Listen to the "mousemove" event

        return () => {
            document.removeEventListener('mousemove', handleMouseMove); // Remove the event listener
        };
    }, []); // Run the effect only once, on mount

    const timeline = gsap.timeline({ paused: true, defaults: { duration: 0.5, ease: 'power1.out' } }); // Create a GSAP timeline

    useEffect(() => {
        projects.forEach((project, index) => { // Iterate over the projects
            timeline.fromTo(`.projetscompo .project:nth-child(${index + 1})`, // Add animations to the project elements
                { y: 20, opacity: 0, transform: 'none' },
                { y: 0, opacity: 1 })
                .fromTo(`.projetscompo .project:nth-child(${index + 1}) .project-title`, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, index * 0.1)
                .fromTo(`.projetscompo .project:nth-child(${index + 1}) .project-sitetype`, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, index * 0.1)
                .fromTo(`.projetscompo .project:nth-child(${index + 1}) .CoLink`, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, index * 0.1);
        });
        timeline.play(); // Play the timeline
    }, [projects]); // Re-run the effect when the projects change

    useEffect(() => {
        gsap.to('.co-link', { duration: 0.5, transition: 'all 0.5s' });
    }, [timeline.progress()]); // Re-run the effect when the timeline is played

    gsap.set(".project", {clearProps:"transform"}); // Remove the transform 0 0 property who blocks the hover by being the oldest parent of a fixed element

    return (
        <div className='projetscompo'>
            {projects.map(project => ( // Iterate over the projects and render the project components
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


