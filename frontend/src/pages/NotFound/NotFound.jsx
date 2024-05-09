import React, { useState, useEffect } from "react";
import './NotFound.scss';
import Header from '../../components/Header/Header';
import Conway from '../../components/Conway/Conway';

function NotFound() {
    const [showText, setShowText] = useState(true);
    const [spacePressed, setSpacePressed] = useState(false);

    useEffect(() => {
        // Toggle the visibility of the text every 1 second
        const interval = setInterval(() => {
            setShowText(prevShowText => !prevShowText);
        }, 1000);

        // Clear the interval when space is pressed
        if (spacePressed) {
            clearInterval(interval);
        }

        // Cleanup function
        return () => clearInterval(interval);
    }, [spacePressed]);

    const handleKeyPress = (event) => {
        if (event.key === ' ' && !spacePressed) {
            setSpacePressed(true);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        // Cleanup function
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [spacePressed]);

    return (
        <div className="notfound-page">
            <Header />
            <div className="notfound-container">
                <Conway />
            </div>
            {showText && !spacePressed && (
                <div className="blink-text">
                    Press Space
                </div>
            )}
        </div>
    );
}

export default NotFound;
