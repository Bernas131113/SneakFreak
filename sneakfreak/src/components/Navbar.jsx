import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './imagens/logo.png';

const Navbar = ({ isAuthenticated, onLogout, toggleCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Lógica de pesquisa, pode enviar o termo de pesquisa para o componente de produtos
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Sneak Freaks Logo" className="logo" />
      <ul className="menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Colections</Link></li>
        {isAuthenticated ? (
          <>
            <li><button onClick={onLogout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Registar</Link></li>
          </>
        )}
      </ul>
      <div className="icons">
        <button className="search-btn" onClick={toggleSearch}>🔍</button>
      </div>

      {/* Barra de pesquisa */}
      {isSearchOpen && (
        <div className="search-container">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Pesquisar tenis..."
            />
            <button type="submit">Pesquisar</button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

