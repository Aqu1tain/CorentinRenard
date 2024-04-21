import React, { useContext } from 'react';


import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './pages/Home/Home';
import Skills from './pages/Skills/Skills';

import { ThemeContext } from './theme';

function App() {

  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/skills" element ={<Skills />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;