import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';  // Importando bcrypt para comparação
import './Login.css'


const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const LOGIN_API_URL = 'https://api.sheety.co/a27d85010a5efc145cde9cef8cc83c46/interfacesWeb/login';

    try {
      // Enviar dados de login para a API
      const response = await axios.get(LOGIN_API_URL);
      
      // Verificar se as credenciais existem na resposta
      const user = response.data.login.find(
        (user) => user.username === username
      );

      // Se o usuário for encontrado e o hash da senha bater
      if (user && bcrypt.compareSync(password, user.password)) {
        onLogin(username, password);
      } else {
        setErrorMessage('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      setErrorMessage('Erro ao tentar fazer login');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            placeholder="Utilizador"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
