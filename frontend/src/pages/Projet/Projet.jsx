import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ClientComment from '../../components/ClientComment/ClientComment'; 
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import './Projet.scss';

function Projet() {
    const [project, setProject] = useState({
        title: "",
        sitetype: "",
        content: "",
        createdAt: "",
        banniereURL: "",
        projectLink: "",
        clientCom: "",
        clientCommentOrigin: "",
        interlocuterName: "",
    });
    const { Handle } = useParams();
    const redirect = useNavigate();
    
    useEffect(() => {
        let isMounted = true;
        fetch('http://localhost:3001/api/posts')
            .then(response => response.json())
            .then(projects => {
                if (isMounted) {
                    const project = projects.find(p => p.textid === Handle);
                    if (project) {
                        setProject({
                            title: project.title,
                            sitetype: project.sitetype,
                            content: project.content,
                            createdAt: project.createdAt,
                            banniereURL: project.imageUrl,
                            projectLink: project.projectLink,
                            clientCom: project.clientComment,
                            clientCommentOrigin: project.clientCommentOrigin,
                            interlocuterName: project.interlocuterName,
                        });
                    } else {
                        redirect("/404");
                    }
                }
            })
            .catch(error => console.error('Error fetching project:', error));
        
        return () => {
            isMounted = false;
        };
    }, [Handle]);

    useEffect(() => {
        Prism.highlightAll();
    }, [project]);

    return (
        <div className='projet-page'>
            <Header />
            <div className='page-content'>
                <ProjectSide project={project} />
                <ProjectDetails project={project} />
            </div>
        </div>
    );
};

const ProjectSide = ({ project }) => (
    <div className='projet-side'>
        <a href={project.projectLink} target='_blank' rel='noopener noreferrer'>
            <img id='projet-banniere' src={project.banniereURL} alt={`Bannière du projet ${project.title}`} />
        </a>
    </div>
);

const ProjectDetails = ({ project }) => (
    <div className='projet-side2'>
        <h1 id='projet-title'>{project.title}</h1>
        <h2 id='projet-sitetype'>{project.sitetype}</h2>
        <h3 id='projet-date'>Article créé le {new Date(project.createdAt).toLocaleDateString("fr-FR", {day: "2-digit", month: "2-digit", year: "numeric"})} à {new Date(project.createdAt).toLocaleTimeString("fr-FR", {hour: "2-digit"})}</h3>
        
        <p id="projet-content" dangerouslySetInnerHTML={{ __html: project.content }}></p>
        {project.clientCom && (
            <ClientComment 
                clientCom={project.clientCom} 
                clientCommentOrigin={project.clientCommentOrigin} 
                interlocuterName={project.interlocuterName} 
            />
        )}
    </div>
);

export default Projet;