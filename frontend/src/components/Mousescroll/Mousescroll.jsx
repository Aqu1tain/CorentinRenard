import React from 'react';
import './Mousescroll.scss';
export default function Mousescroll() {

    return (    
        <div className="mousescroll">
            <svg
                width="23"
                height="39"
                viewBox="0 0 23 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x="0.5"
                    y="0.5"
                    width="21"
                    height="37"
                    rx="10"
                    stroke="white"
                    strokeWidth="1"
                />
               <rect
                   id = "rect"
                   x="10.5"
                   y="6.4"
                   width="2"
                   height="7"
                   rx="1"
                   fill="white"
               />
           </svg>
       </div>
   )
}