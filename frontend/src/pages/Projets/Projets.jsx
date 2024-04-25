import React from 'react';

import './Projets.scss';

import Header from '../../components/Header/Header';

import ProjetsCompo from '../../components/ProjetsCompo/ProjetsCompo';

export default function Projets() {

    return (
        <div>
            <Header />
            <div className='projetspage'>
                <div className='projets'>
                    <h1>Mes projets</h1>
                    <ProjetsCompo />
                </div>
            </div>
        </div>
    )
}