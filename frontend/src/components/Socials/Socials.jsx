import React, { useContext } from 'react';

import './Socials.scss';

import LinkedinDark from '../../assets/svgs/LinkedIn-Dark.svg';
import LinkedinLight from '../../assets/svgs/LinkedIn-Light.svg';
import GithubDark from '../../assets/svgs/Github-Dark.svg';
import GithubLight from '../../assets/svgs/Github-Light.svg';
import InstagramDark from '../../assets/svgs/Instagram-Dark.svg';
import InstagramLight from '../../assets/svgs/Instagram-Light.svg';
import MailDark from '../../assets/svgs/Mail-Dark.svg';
import MailLight from '../../assets/svgs/Mail-Light.svg';

import { ThemeContext } from '../../theme';

export default function Socials() {
  const {theme, setTheme} = useContext(ThemeContext);

  return (
    <div className="socials">
      <a href="mailto:contact@corentinrenard.com" target='_blank'><img src={theme === "light-theme" ? MailLight : MailDark} alt="mail logo" className="light" /></a>
      <a href="https://www.instagram.com/corentin_fox/" target='_blank'><img src={theme === "light-theme" ? InstagramLight : InstagramDark} alt="instagram logo" className="light" /></a>
      <a href="https://github.com/Aqu1tain" target='_blank'><img src={theme === "light-theme" ? GithubLight : GithubDark} alt="github logo" className="light" /></a>
      <a href="https://www.linkedin.com/in/corentin-renard-894253256/" target='_blank'><img src={theme === "light-theme" ? LinkedinLight : LinkedinDark} alt="linkedin logo" className="light" /></a>
    </div>
  );
}


