import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductsGrid from './components/ProductsGrid';
import Footer from './components/Footer';
import LoginPage from './components/Login';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null); // Estado para armazenar informações do usuário

  // Função para lidar com o login
  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'password') {
      setUser({ username: 'admin', isAdmin: true });
    } else {
      alert('Credenciais inválidas!');
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar isAuthenticated={!!user} isAdmin={user?.isAdmin} />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/products" element={<ProductsGrid />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/admin" /> : <LoginPage onLogin={handleLogin} />}
          />
          <Route
            path="/admin"
            element={user?.isAdmin ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
