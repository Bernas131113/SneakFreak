import React from 'react';
import './Hero.css';
import HeroImage from './imagens/principal.png';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Bem-vindo à Sneak Freaks!</h1>
        <p>Descobre o universo dos ténis onde estilo, conforto e exclusividade andam de mãos dadas. A nossa paixão é conectar-te às marcas mais desejadas e aos modelos mais inovadores do mercado.</p>
        <p>Seja para fãs dos clássicos ou para os que seguem as últimas tendências, aqui encontras uma coleção cuidadosamente selecionada para todos os gostos e estilos. Desde edições limitadas a ícones intemporais, os nossos ténis são muito mais do que calçado: são uma expressão da tua personalidade.</p>
      </div>
      <div className="hero-image">
        <img src={HeroImage} alt="Hero Sneakers" />
      </div>
    </div>
  );
};

export default Hero;
