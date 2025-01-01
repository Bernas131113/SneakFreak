import React from 'react';
import './Hero.css';
import HeroImage from './imagens/freaky.jpg';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Descubre os melhores Sneakers</h1>
        <p>Aqui podes encontrar os modelos mais icônicos e tendências exclusivas.</p>
        <button className="shop-now">Comprar Agora</button>
      </div>
      <div className="hero-image">
        <img src={HeroImage} alt="Hero Sneakers" />
      </div>
    </div>
  );
};

export default Hero;
