import React from 'react';

import './Technos.scss';

export default function Technos({ technos }) {
  return (
    <div className="technos-container">
      {technos.map(techno => (
        <div className='techno'>
            <div
            className="techno-inner"
            onMouseEnter={() =>
                (document.querySelector(`#${techno}-img`).src = require(`../../assets/svgs/${techno}2.svg`))
            }
            onMouseLeave={() =>
                (document.querySelector(`#${techno}-img`).src = require(`../../assets/svgs/${techno}1.svg`))
            }
            >
            <img
                id={`${techno}-img`}
                src={require(`../../assets/svgs/${techno}1.svg`)}
                alt={techno}
            />
            </div>
        </div>
      ))}
    </div>
  );
}
