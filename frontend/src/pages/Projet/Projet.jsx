import React, { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import Header from '../../components/Header/Header';

import './Projet.scss';


function Projet() {
    const [title, setTitle] = useState("")
    const [sitetype, setSitetype] = useState("")
    const [content, setContent] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [banniereURL, setBanniereURL] = useState("")
    const { Handle } = useParams()
    const redirect = useNavigate();
    console.log("Handle :" + Handle);

    useEffect(() => {
        fetch('http://localhost:3001/api/posts')
            .then(response => response.json())
            .then(projects => {
                const project = projects.find(p => p.textid === Handle);
                if (project) { 
                    setTitle(project.title);
                    setSitetype(project.sitetype);
                    setContent(project.content);
                    setCreatedAt(project.createdAt);
                    setBanniereURL(project.imageUrl);
                } else {
                    redirect("/404");
                };
            })
    }, [Handle]);

    return (
        <div className='projet-page'>
            <Header />
            <div className='page-content'>
                <h1 id='projet-title'>{title}</h1>
                <h2 id='projet-sitetype'>{sitetype}</h2>
                <h3 id='projet-date'>Article créé le {new Date(createdAt).toLocaleDateString("fr-FR", {day: "2-digit", month: "2-digit", year: "numeric"})} à {new Date(createdAt).toLocaleTimeString("fr-FR", {hour: "2-digit"})}</h3>
                <img id='project-banniere' src={banniereURL} alt={title}></img>
                <div id="project-content">{content}</div>
            </div>
        </div>    
    );
};

export default Projet;