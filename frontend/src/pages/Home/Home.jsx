import React from 'react';

// Components
import Header from '../../components/Header/Header';
import Welcome from '../../components/Welcome/Welcome';
import Bubbles from '../../components/Bubbles/Bubbles';
import About from '../../components/About/About';
import Lastprojects from '../../components/Lastprojects/Lastprojects';
import Contact from '../../components/Contact/Contact';
import './Home.scss';

export default function Home() {
    return (
        <>
            <Header />
            <Welcome />
            <About />
            <Lastprojects />
            <Contact />
            <Bubbles />
        </>
    );
}