import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';  // Importando bcrypt
import './Register.css'

const RegisterPage = ({ onRegister }) => {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = formData;

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem!');
      return;
    }

    try {
      // Verifica se o utilizador já existe
      const response = await axios.get(
        `https://api.sheety.co/da4ef9e6c38d598207d9980e313a3a26/interfacesWeb/login`
      );
      const users = response.data.login; // Lista de usuários do Sheety

      // Se o nome de utilizador já existe
      if (users.find((user) => user.username === username)) {
        setErrorMessage('Nome de utilizador já existe!');
        return;
      }

      // Guarda a senha antes de enviá-la
      const hashedPassword = bcrypt.hashSync(password, 10); // 10 é o número de "salt rounds"

      // Fazer a requisição POST com a senha guardada
      await axios.post(
        `https://api.sheety.co/da4ef9e6c38d598207d9980e313a3a26/interfacesWeb/login`,
        {
          login: {
            username,
            password: hashedPassword,  // Envia a senha criptografada
          },
        }
      );

      setErrorMessage('');
      setSuccessMessage('Registo bem-sucedido! Agora, faça o login.');
      setFormData({ username: '', password: '', confirmPassword: '' });
      onRegister(username); // Chama a função onRegister passada pelo App
    } catch (error) {
      console.error('Erro ao registar utilizador:', error);
      setErrorMessage('Ocorreu um erro, tente novamente.');
    }
  };

  return (
    <div>
      <h2>Registar</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="username"
          placeholder="Utilizador"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">Registar</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default RegisterPage;
