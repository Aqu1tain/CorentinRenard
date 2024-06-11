import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ClientComment from '../../components/ClientComment/ClientComment'; 
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import DocumentMeta from 'react-document-meta';
import './Projet.scss';

const apiUrl = process.env.REACT_APP_API_URL;

function Projet() {
    const [project, setProject] = useState({
        title: "",
        sitetype: "",
        content: "",
        createdAt: "",
        description: "",
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
        fetch(`${apiUrl}/api/posts`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
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
                            description: project.description,
                            clientCom: project.clientComment,
                            clientCommentOrigin: project.clientCommentOrigin,
                            interlocuterName: project.interlocuterName,
                        });
                    } else {
                        redirect("/404");
                    }
                }
            })
            .catch(error => {
                if (error.name === 'SyntaxError' && error.message.includes('Unexpected token')) {
                    console.error('Error fetching project: SyntaxError: Unexpected token', error.message);
                } else {
                    console.error('Error fetching project:', error);
                }
            });

        
        return () => {
            isMounted = false;
        };
    }, [Handle, redirect]);

    useEffect(() => {
        Prism.highlightAll();
    }, [project]);

    const meta = {
        title: project.title,
        description: project.description,
        canonical: `https://corentinrenard.com/projects/${project.title}`,
        meta: {
            charset: "utf-8",
            name: {
                keywords: "projet, corentin, renard, portfolio, corentin renard, corentinrenard, corentinrenard.com",
            },
            property: {
                'og:title': project.title,
                'og:description': project.description,
                'og:url': `https://corentinrenard.com/projects/${project.title}`,
                'og:image': project.banniereURL,
                'og:type': 'article',
                'og:locale': 'fr_FR',
                'twitter:card': 'summary_large_image',
            },
        },
    }
    
    return (
        <div className='projet-page'>
            <Header />
            <DocumentMeta {...meta} />
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
    <article className='projet-side2'>
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
    </article>
);

export default Projet;