import React from 'react';
import Bubble from '../Bubble/Bubble';

export default function Bubbles() {
    // Fills the page with bubbles randomly axed on x , but on top of each other on y
    const bubbles = [];
    // get page height
    const pageHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    // 2 bubbles can be view at the same time //calculate the number of bubbles
    const numberOfBubbles = Math.ceil(pageHeight / 180);
    let precedentColor = Math.random() < 0.5 ? 'blue' : 'green'; // Color of the bubble
    let precedentType = Math.random() < 0.5 ? '1' : '2'; // Type of the bubble
    let precedentAlignement = Math.random() < 0.5 ? 'left' : 'right'; // Alignement of the bubble
    let precedentHeight = 0; // Top position of the bubble
    for (let i = 0; i < numberOfBubbles; i++) {
        bubbles.push(
            <Bubble
                color={precedentColor} // Color of the bubble
                type="2" // Type of the bubble
                top={`${precedentHeight}px`} // Top position of the bubble
                style={{ // Style of the bubble
                    left: `${precedentAlignement === 'left' ? Math.random() * 90 + "px" : "undefined"}`, // Left position of the bubble when alignement is left
                    right: `${precedentAlignement === 'right' ? Math.random() * 90 + "px" : "undefined"}` // Right position of the bubble when alignement is right
                }}
            />
        );
        precedentColor = precedentColor === 'blue' ? (Math.random() < 0.6 ? 'green' : 'blue') : 'blue'; // Change the color of the bubble
        precedentType = precedentType === '1' ? '2' : '1'; // Change the type of the bubble
        precedentHeight += Math.random() * 70 + 450; // Increment the top position of the bubble
        precedentAlignement = precedentAlignement === 'left' ? 'right' : 'left'; // Change the alignement of the bubble
    }
    return (
        <div className="bubbles" style={{overflow: 'hidden'}}>
            {bubbles}
        </div>
    )
}
