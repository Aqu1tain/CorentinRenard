import React from 'react';

// Components
import Header from '../../components/Header/Header';
import Welcome from '../../components/Welcome/Welcome';
import Bubbles from '../../components/Bubbles/Bubbles';

import './Home.scss';

export default function Home() {
    return (
        <>
            <Header />
            <Welcome />
            <Bubbles />
        </>
    );
}