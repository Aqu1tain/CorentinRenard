import React, { useState } from 'react';
import './BurgerMenu.scss';

const BurgerMenu = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    return (
        <button
            className={`McButton ${isActive ? 'active' : ''}`}
            data="hamburger-menu"
            onClick={toggleMenu}
            aria-label="Menu"
        >
            <b></b>
            <b></b>
            <b></b>
        </button>
    );
};

export default BurgerMenu;
