import React from 'react';
import './Projets.scss';
import Header from '../../components/Header/Header';
import ProjetsCompo from '../../components/ProjetsCompo/ProjetsCompo';

export default function Projets() {
    return (
        <div className="projets-page">
            <Header />
            <div className="projets-container">
                <h1 className="projets-title">Mes projets</h1>
                <ProjetsCompo />
            </div>
        </div>
    );
}
