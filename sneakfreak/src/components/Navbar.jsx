import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './imagens/logo.png';

const Navbar = ({ isAuthenticated, onLogout, toggleCart }) => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Sneak Freaks Logo" className="logo" />
      <ul className="menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Coleções</Link></li>
        {isAuthenticated ? (
          <>
            <li><button onClick={onLogout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Registrar</Link></li> {/* Link de Registrar */}
          </>
        )}
      </ul>
      <div className="icons">
        <button className="search-btn">🔍</button>
      </div>
    </nav>
  );
};

export default Navbar;
