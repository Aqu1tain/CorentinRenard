import React, { useContext } from 'react';

import "./ModeSwitch.scss"

import Dark from '../../assets/svgs/Dark.svg';
import Light from '../../assets/svgs/Light.svg';

import { ThemeContext } from '../../theme';

export default function ModeSwitch() {

  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <span className="mode-switch" onClick={() => toggleTheme()}>
      <img src={theme === "light-theme" ? Light : Dark} alt="dark mode" />
    </span>
  );
}