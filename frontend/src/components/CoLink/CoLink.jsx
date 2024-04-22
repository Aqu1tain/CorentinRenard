import React from 'react';
import './CoLink.scss';

export default function CoLink(props) {
    return (
        <a href={props.to} target={props.target} className="co-link">
            <span>{props.children}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="22" viewBox="0 0 33 22" fill="none">
                <path id="Vector" d="M0 11H31M31 11L21.2571 1.5M31 11L21.2571 20.5" stroke-width="2"/>
            </svg>
        </a>
    );
}