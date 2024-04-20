import React, { useState, useEffect } from 'react'; // Import the useState and useEffect hooks from React
import './Lastprojects.scss';
import Button from '../Button/Button';

// This component will display the latest projects on the homepage
export default function Lastprojects() {
    const [projects, setProjects] = useState([]); // Store the projects in state

    // Fetch the projects from the API on mount
    useEffect(() => {
        fetch('http://localhost:3001/api/posts') // Fetch the projects from the API
            .then(response => response.json()) // Parse the response as JSON
            .then(data => setProjects(data)); // Store the projects in state
    }, []); // Run the effect only once, on mount

    return (
        <div className="lastprojects"> {/* The root div of the component */}
            <h1 className="title">Derniers projets</h1> {/* The title of the section */}
            <ul className="projects-list"> {/* The unordered list of projects */}
                {projects
                    .slice(-3) // Keep only the 3 most recent projects
                    .map(project => ( // Map over the projects and render a list item for each one
                        <li key={project._id} className="project"> {/* The wrapper for each project, with a unique key */}
                            <h2 className="project-title">{project.title}</h2> {/* The title of the project */}
                            <p className="project-content">{project.sitetype}</p> {/* The content of the project */}
                            <Button className="project-button"><p>En savoir plus</p></Button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

