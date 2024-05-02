import React from 'react';

import Header from '../../components/Header/Header';

import Contact from '../../components/Contact/Contact';

import './ContactPage.scss';

export default function ContactPage() {

    return (
        <div className="contact-page">
            <Header />
            <div className="contact-container">
                <Contact />
            </div>
        </div>
    )
}
