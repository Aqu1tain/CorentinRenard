import React, { useContext } from 'react';


import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './pages/Home/Home';
import Skills from './pages/Skills/Skills';
import ContactPage from './pages/ContactPage/ContactPage';
import Projets from './pages/Projets/Projets';
import Aboutme from './pages/AboutmePage/Aboutme';
import Projet from './pages/Projet/Projet';

import { ThemeContext } from './theme';
import NotFound from './pages/NotFound/NotFound';

function App() {

  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/skills" element ={<Skills />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects" element={<Projets />} />
          <Route path="/about" element={<Aboutme />} />
          <Route path="/projects/:Handle" element={<Projet />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;