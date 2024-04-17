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
    var precedentHeight = 0;
    for (let i = 0; i < numberOfBubbles; i++) {
        bubbles.push(<Bubble key={i} color={precedentColor == 'blue' ? 'green' : 'blue'} type={precedentType == '1' ? '2' : '1'} top={precedentHeight+'px'} left={Math.random() * (window.innerWidth - 200) + 'px'} />);
        precedentColor = precedentColor == 'blue' ? 'green' : 'blue';
        precedentType = precedentType == '1' ? '2' : '1';
        precedentHeight += 400;
    }
    return (
        <div className="bubbles" style={{overflow: 'hidden'}}>
            {bubbles}
        </div>
    )
}