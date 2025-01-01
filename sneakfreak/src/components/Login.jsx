import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";

// Componente para formulário de login
const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
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
  );
};

// Componente para formulário de registro
const RegisterForm = ({ onRegister, onCancel }) => {
  const [newUser, setNewUser] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(newUser);
  };

  return (
    <div>
      <h3>Registrar Novo Usuário</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nome de usuário"
          value={newUser.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={newUser.password}
          onChange={handleChange}
        />
        <button type="submit">Registrar</button>
      </form>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

// Componente para gerenciar produtos
const ProductManager = ({ products, onAdd, onEdit, onDelete }) => {
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    onAdd(newProduct);
    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <div>
      <h3>Gerenciar Produtos</h3>
      <div>
        <h4>Adicionar Produto</h4>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={newProduct.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Preço"
          value={newProduct.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="URL da Imagem"
          value={newProduct.image}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Adicionar Produto</button>
      </div>
      <div>
        <h4>Lista de Produtos</h4>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <div>
                <h5>{product.name}</h5>
                <p>{product.price}</p>
                <img src={product.image} alt={product.name} width="100" />
                <button onClick={() => onEdit(product.id)}>Editar</button>
                <button onClick={() => onDelete(product.id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Componente principal
const LoginPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://api.sheety.co/a27d85010a5efc145cde9cef8cc83c46/interfacesWeb/sneakers"
      );
      setProducts(response.data.sneakers);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleLogin = ({ username, password }) => {
    if (username === "admin" && password === "password") {
      setIsAdmin(true);
      fetchProducts();
    } else {
      alert("Credenciais inválidas!");
    }
  };

  const handleRegister = async (newUser) => {
    try {
      await axios.post(
        "https://api.sheety.co/a27d85010a5efc145cde9cef8cc83c46/interfacesWeb/login",
        { user: newUser }
      );
      alert("Usuário registrado com sucesso!");
      setIsRegistering(false);
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      alert("Erro ao registrar usuário!");
    }
  };

  const handleAddProduct = async (product) => {
    try {
      await axios.post(
        "https://api.sheety.co/a27d85010a5efc145cde9cef8cc83c46/interfacesWeb/sneakers",
        { sneaker: product }
      );
      fetchProducts();
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  const handleEditProduct = async (productId) => {
    // Implementação da lógica de edição
    alert(`Editar produto com ID: ${productId}`);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(
        `https://api.sheety.co/a27d85010a5efc145cde9cef8cc83c46/interfacesWeb/sneakers/${productId}`
      );
      fetchProducts();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  return (
    <div>
      {!isAdmin ? (
        <div>
          {!isRegistering ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <RegisterForm onRegister={handleRegister} onCancel={() => setIsRegistering(false)} />
          )}
          <button onClick={() => setIsRegistering(true)}>Cadastrar</button>
        </div>
      ) : (
        <div>
          <h2>Bem-vindo, Admin!</h2>
          <button onClick={handleLogout}>Sair</button>
          <ProductManager
            products={products}
            onAdd={handleAddProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </div>
      )}
    </div>
  );
};

export default LoginPage;
