import React from 'react';
import {
    Link
} from "react-router-dom";

import './Header.scss';

export default function Header() {
    return (
        <div className="header">
            <h2>Corentin Renard</h2>
            <nav>
                <ul>
                    <li><Link to="/" className='active'>Accueil</Link></li>
                    <li><Link to="/projects">Portfolio</Link></li>
                    <li><Link to="/skills">Compétences</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>

        </div>
    );
};