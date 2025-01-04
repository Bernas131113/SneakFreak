import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './imagens/logo.png';

const Navbar = ({ isAuthenticated, onLogout, toggleCart, setSearchTerm }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(localSearchTerm); // Atualiza o estado global
    setIsSearchOpen(false); // Fecha a barra de pesquisa
  };

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
            <li><Link to="/register">Registrar</Link></li>
          </>
        )}
        <li><button className="cart-btn" onClick={toggleCart}>🛒</button></li>
        <li><button className="search-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>🔍</button></li>
      </ul>
      {isSearchOpen && (
        <div className="search-container">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              placeholder="Pesquisar"
            />
            <button type="submit">Pesquisar</button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
