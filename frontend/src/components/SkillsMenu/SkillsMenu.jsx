import React, { useCallback } from 'react';

import './SkillsMenu.scss';

const SkillsMenu = () => {
    const [selectedList, setSelectedList] = React.useState('frontend');

    const handleClick = useCallback(id => setSelectedList(id), []);

    return (
        <div className="skill-menu">
            <div className="choices">
                <div className={`choice ${selectedList === 'designer' ? 'active' : ''}`} onClick={() => handleClick('designer')}>
                    <p>
                        Comme Web Designer
                    </p>
                </div>
                <div className={`choice ${selectedList === 'frontend' ? 'active' : ''}`} onClick={() => handleClick('frontend')}>
                    <p>
                        Comme Dev Frontend
                    </p>
                </div>
                <div className={`choice ${selectedList === 'backend' ? 'active' : ''}`} onClick={() => handleClick('backend')}>
                    <p>
                        Comme Dev backend
                    </p>
                </div>
                
            </div>
            <div className={`skill-list ${selectedList}`}>
                <ul>
                    {(selectedList === 'designer') && (
                        <>
                            <li>Photoshop</li>
                            <li>Illustrator</li>
                            <li>Figma</li>
                            <li>Crayon à Papier</li>
                        </>
                    )}
                    {(selectedList === 'backend') && (
                        <>
                            <li>Express.js</li>
                            <li>Node.js</li>
                            <li>MongoDB</li>
                            <li>MySQL</li>
                        </>
                    )}
                    {(selectedList === 'frontend') && (
                        <>
                            <li>React.js</li>
                            <li>Sass</li>
                            <li>Vanilla</li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default SkillsMenu;

