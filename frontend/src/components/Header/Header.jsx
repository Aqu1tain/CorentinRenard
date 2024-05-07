import React from 'react';
import {
    Link
} from "react-router-dom";

import './Header.scss';
import './TitleAnim.scss';
import ModeSwitch from '../ModeSwitch/ModeSwitch';

export default function Header() {
    return (
        <div className="header">
            <h2><Link to="/"><span id='corentin'>Corentin</span> <span id='renard'>Renard</span></Link></h2>
            <nav>
                <ul>                    
                    <li><Link to="/skills">Compétences</Link></li>
                    <li><Link to="/projects">Projets</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
                <ModeSwitch />
            </nav>

        </div>
    );
};