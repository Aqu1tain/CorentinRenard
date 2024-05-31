import React from 'react';
import { Link } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import './Header.scss';
import './HoverEffects.scss';
import ModeSwitch from '../ModeSwitch/ModeSwitch';

export default function Header() {
    return (
        <div className="header">
            <h2><Link to="/"><span id='corentin'>Corentin</span> <span id='renard'>Renard</span></Link></h2>
            <nav id="nav-desktop">
                <ul>                    
                    <li><Link to="/about">A propos de moi</Link></li>
                    <li><Link to="/projects">Projets</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
                <ModeSwitch />
            </nav>
            <nav id="nav-mobile">
                <BurgerMenu />
                <ul id="menu" className="menu">
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/about">A propos de moi</Link></li>
                    <li><Link to="/projects">Projets</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <ModeSwitch />
                </ul>
                
            </nav>
        </div>
    );
}
