import React, { useState, useEffect } from 'react';

import './ProjetsCompo.scss';

export default function ProjetsCompo() {

    const [projects, setProjects] = useState([]); // Store the projects in state

    // Fetch the projects from the API on mount
    useEffect(() => {
        fetch('http://localhost:3001/api/posts') // Fetch the projects from the API
            .then(response => response.json()) // Parse the response as JSON
            .then(data => setProjects(data)) // Store the projects in state
            .then(() => console.log(projects));
    }, []); // Run the effect only once, on mount

    return (
        <div className='projetscompo'> 
            {projects.map(project => ( // Map over the projects and render a div for each one
                <div key={project._id} className="project"> {/* The wrapper for each project, with a unique key */}
                    <h2 className="project-title">{project.title}</h2> {/* The title of the project */}
                    <p className="project-content">{project.sitetype}</p> {/* The content of the project */}
                </div>
            ))}
        </div>
    );
}

