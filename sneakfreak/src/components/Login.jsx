import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Atualiza os dados do formulário de login
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Atualiza os dados do formulário de registro
  const handleRegisterChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  // Atualiza os dados do formulário de novo produto
  const handleNewProductChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  // Função para autenticação do usuário
  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.username === 'admin' && formData.password === 'password') {
      onLogin(formData.username, formData.password);
      setIsAdmin(true);
      fetchProducts();
    } else {
      alert('Credenciais inválidas!');
    }
  };

  // Função para registrar um novo usuário
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'https://api.sheety.co/a27d85010a5efc145cde9cef8cc83c46/interfacesWeb/login',
        {
          username: newUser.username,
          password: newUser.password,
        }
      );
      alert('Usuário registrado com sucesso!');
      setIsRegistering(false);
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      alert('Erro ao registrar usuário!');
    }
  };

  // Função para buscar produtos
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'https://api.sheety.co/a27d85010a5efc145cde9cef8cc83c46/interfacesWeb/sneakers'
      );
      setProducts(response.data.sneakers);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  // Função para adicionar um novo produto
  const handleAddProduct = async () => {
    try {
      await axios.post(
        'https://api.sheety.co/a27d85010a5efc145cde9cef8cc83c46/interfacesWeb/sneakers',
        { sneaker: newProduct }
      );
      alert('Produto adicionado com sucesso!');
      setNewProduct({ name: '', price: '', image: '' });
      fetchProducts();
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      alert('Erro ao adicionar produto!');
    }
  };

  // Função para editar um produto
  const handleEditProduct = async (productId) => {
    try {
      await axios.put(
        `https://api.sheety.co/a27d85010a5efc145cde9cef8cc83c46/interfacesWeb/sneakers/${productId}`,
        { sneaker: newProduct }
      );
      alert('Produto atualizado com sucesso!');
      fetchProducts();
      setNewProduct({ name: '', price: '', image: '' });
    } catch (error) {
      console.error('Erro ao editar produto:', error);
      alert('Erro ao editar produto!');
    }
  };

  // Função para excluir um produto
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(
        `https://api.sheety.co/a27d85010a5efc145cde9cef8cc83c46/interfacesWeb/sneakers/${productId}`
      );
      alert('Produto excluído com sucesso!');
      fetchProducts();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      alert('Erro ao excluir produto!');
    }
  };

  // Função para logout
  const handleLogout = () => {
    setIsAdmin(false);
    setFormData({ username: '', password: '' });
  };

  return (
    <div>
      {!isAdmin ? (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              placeholder="Usuário"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit">Entrar</button>
          </form>
          <button onClick={() => setIsRegistering(true)}>Registrar</button>

          {isRegistering && (
            <div>
              <h3>Registrar Novo Usuário</h3>
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  name="username"
                  placeholder="Nome de Usuário"
                  value={newUser.username}
                  onChange={handleRegisterChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Senha"
                  value={newUser.password}
                  onChange={handleRegisterChange}
                />
                <button type="submit">Registrar</button>
              </form>
              <button onClick={() => setIsRegistering(false)}>Cancelar</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Bem-vindo, Admin!</h2>
          <button onClick={handleLogout}>Sair</button>

          <h3>Gerenciar Produtos</h3>
          <div>
            <h4>Adicionar Produto</h4>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={newProduct.name}
              onChange={handleNewProductChange}
            />
            <input
              type="text"
              name="price"
              placeholder="Preço"
              value={newProduct.price}
              onChange={handleNewProductChange}
            />
            <input
              type="text"
              name="image"
              placeholder="URL da Imagem"
              value={newProduct.image}
              onChange={handleNewProductChange}
            />
            <button onClick={handleAddProduct}>Adicionar Produto</button>
          </div>

          <h4>Produtos</h4>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <h5>{product.name}</h5>
                <p>{product.price}</p>
                <img src={product.image} alt={product.name} width="100" />
                <button
                  onClick={() => setNewProduct({
                    name: product.name,
                    price: product.price,
                    image: product.image,
                  })}
                >
                  Editar
                </button>
                <button onClick={() => handleDeleteProduct(product.id)}>Excluir</button>
              </li>
            ))}
          </ul>

          {newProduct.name && (
            <div>
              <h4>Editar Produto</h4>
              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={newProduct.name}
                onChange={handleNewProductChange}
              />
              <input
                type="text"
                name="price"
                placeholder="Preço"
                value={newProduct.price}
                onChange={handleNewProductChange}
              />
              <input
                type="text"
                name="image"
                placeholder="URL da Imagem"
                value={newProduct.image}
                onChange={handleNewProductChange}
              />
              <button onClick={() => handleEditProduct(products.find(p => p.name === newProduct.name).id)}>
                Atualizar Produto
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginPage;