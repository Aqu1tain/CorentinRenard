import React from 'react';

import Header from '../../components/Header/Header';

import './Skills.scss';

import SkillsMenu from '../../components/SkillsMenu/SkillsMenu';

export default function Skills() {
    return (
        <>        
            <Header />
            <div className='skillspage'>
                <div className='skills'>
                    <h1>Mes compétences</h1>
                    <SkillsMenu />
                </div>
            </div>
        </>

    );
}