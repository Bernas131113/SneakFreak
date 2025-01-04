import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductsGrid from './components/ProductsGrid';
import Footer from './components/Footer';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import Admin from './components/Admin';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Termo de pesquisa

  const handleLogin = (username, password) => {
    setUser({ username, isAdmin: username === 'admin' });
  };

  const handleLogout = () => {
    setUser(null);
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
      setCart([]);
      setIsCartOpen(false);
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
          setSearchTerm={setSearchTerm}
        />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route
            path="/products"
            element={<ProductsGrid addToCart={addToCart} searchTerm={searchTerm} />}
          />
          <Route path="/login" element={user ? <Navigate to="/admin" /> : <LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={user?.isAdmin ? <Admin onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Modal do Carrinho */}
        {isCartOpen && (
          <div className={`cart-modal ${isCartOpen ? 'open' : ''}`}>
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
