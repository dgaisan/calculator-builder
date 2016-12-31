import React from 'react';
import './header.css';
import logo from './../resources/logo.svg';

const Header = ({text}) => {
  return (
    <div className="Header-Style">
      <img src={logo} className="Header-Logo" alt="logo" />
      <h2>{text}</h2>
    </div>
  );
};

export default Header;
