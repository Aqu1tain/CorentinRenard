import React from 'react';
import './Bubble.scss';

export default function Bubble(props) {
    var size;
    if (props.type === '1') {
        size = Math.random() * 100 + 100;
    } else {
        size = 500;
    }
    const type = props.type || '1';
    var color;
    if (props.color === 'blue') {
        color = "rgb(89 164 208 / 38%)"
    } else {
        color = "rgb(74 189 172 / 38%)"
    }
    return (
        <div 
            className={"bubble bubble-" + type} 
            style={{
                top: props.top, backgroundColor: color, height: size + 'px', width: size + 'px', borderRadius: size/2 + 'px', ...props.style
            }}
        >
        </div>
    );
}