import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 SneakFreak - Todos os direitos reservados</p>
        <ul className="footer-menu">
          <li><a href="#politica">Política de Privacidade</a></li>
          <li><a href="#termos">Termos e Condições</a></li>
          <li><a href="#contactos">Contactos</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
