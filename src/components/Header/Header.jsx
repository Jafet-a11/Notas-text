import React from 'react';
import './Header.css';

// Recibe el título como una propiedad (prop)
const Header = ({ title }) => {
  return (
    <header className="app-header">
      <h1>{title}</h1>
    </header>
  );
};

export default Header;