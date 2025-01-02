import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductsGrid from './components/ProductsGrid';
import Footer from './components/Footer';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';  // Importando o RegisterPage
import Admin from './components/Admin';  // Importando o Admin
import './App.css';

const App = () => {
  const [user, setUser] = useState(null); // Estado para armazenar informações do usuário
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para controlar o carrinho
  const [cart, setCart] = useState([]); // Estado para armazenar os produtos no carrinho

  const handleLogin = (username, password) => {
    setUser({ username, isAdmin: username === 'admin' });
  };

  const handleLogout = () => {
    setUser(null); // Remove o usuário logado
  };

  const handleRegister = (username) => {
    setUser({ username, isAdmin: username === 'admin' }); // Após registro, o usuário entra automaticamente
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const finalizePurchase = () => {
    if (cart.length > 0) {
      alert('Compra finalizada com sucesso!');
      setCart([]); // Limpa o carrinho após a compra
      setIsCartOpen(false); // Fecha o carrinho
    } else {
      alert('Seu carrinho está vazio.');
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar 
          isAuthenticated={!!user} 
          isAdmin={user?.isAdmin} 
          onLogout={handleLogout}
          toggleCart={toggleCart} 
        />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/products" element={<ProductsGrid addToCart={addToCart} />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/admin" /> : <LoginPage onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={<RegisterPage onRegister={handleRegister} />} // Rota de Registro
          />
          <Route
            path="/admin"
            element={user?.isAdmin ? <Admin onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Carrinho de Compras */}
        {isCartOpen && (
          <div className="cart-modal">
            <h2>Carrinho de Compras</h2>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <img src={item.image} alt={item.name} width="50" />
                  <p>{item.name} - {item.price}</p>
                  <button onClick={() => removeFromCart(item.id)}>Remover</button>
                </li>
              ))}
            </ul>
            <button onClick={finalizePurchase}>Finalizar Compra</button>
            <button onClick={toggleCart}>Fechar Carrinho</button>
          </div>
        )}

        <Footer />
      </div>
    </Router>
  );
};

export default App;
