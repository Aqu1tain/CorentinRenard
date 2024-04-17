import React from 'react';
import Bubble from '../Bubble/Bubble';

export default function Bubbles() {
    // Fills the page with bubbles randomly axed on x , but on top of each other on y
    const bubbles = [];
    // get page height
    const pageHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    // 2 bubbles can be view at the same time //calculate the number of bubbles
    const numberOfBubbles = Math.ceil(pageHeight / 400);
    var precedentColor = Math.random() < 0.5 ? 'blue' : 'green';
    var precedentType = Math.random() < 0.5 ? '1' : '2';
    var precedentAlignement = Math.random() < 0.5 ? 'left' : 'right';
    var precedentHeight = 0;
    for (let i = 0; i < numberOfBubbles; i++) {
        bubbles.push(
            <Bubble
                color={precedentColor === 'blue' ? 'green' : 'blue'}
                type='2'
                top={`${precedentHeight}px`}
                style={{
                    left: `${precedentAlignement === 'left' ? Math.random() * 70 + "px" : "undefined"}`,
                    right: `${precedentAlignement === 'right' ? Math.random() * 70 + "px" : "undefined"}`
                }}
                
            />
        );
        precedentColor = precedentColor === 'blue' ? 'green' : 'blue';
        precedentType = precedentType === '1' ? '2' : '1';
        precedentHeight += 400;
        precedentAlignement = precedentAlignement === 'left' ? 'right' : 'left';
    }
    return (
        <div className="bubbles" style={{overflow: 'hidden'}}>
            {bubbles}
        </div>
    )
}