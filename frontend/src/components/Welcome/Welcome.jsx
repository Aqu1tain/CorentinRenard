import React from 'react';
import './Welcome.scss';
import Technos from '../Technos/Technos';
import Mousescroll from '../Mousescroll/Mousescroll';
export default function Welcome() {
    return (
        <div className="welcome">
            <div className='presentation'>
                <h3>Bonjour 👋 je suis</h3>
                <h1>Corentin Renard</h1>
                <h2>Développeur Web</h2>
                <Technos technos={['Wordpress','Figma','HTML' ,'Python' , 'PHP' ]} />
            </div>
            <Mousescroll />
        </div>
    );
}