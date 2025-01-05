import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css'

const Admin = ({ onLogout }) => {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ name: '', price: '', image: '' });
  const [editandoProduto, setEditandoProduto] = useState(null);

  // Buscar produtos da API ao carregar o componente
  useEffect(() => {
    fetchProdutos();
  }, []);

  // Função para buscar produtos da API
  const fetchProdutos = async () => {
    try {
      const response = await axios.get(
        'https://api.sheety.co/da4ef9e6c38d598207d9980e313a3a26/interfacesWeb/sneakers'
      );
      setProdutos(response.data.sneakers); // Supondo que os dados estão na chave 'sneakers'
    } catch (error) {
      console.error('Erro ao procurar produtos:', error);
      alert('Erro ao carregar os produtos!');
    }
  };

  // Função para adicionar um novo produto
  const handleAdicionarProduto = async () => {
    try {
      await axios.post(
        'https://api.sheety.co/da4ef9e6c38d598207d9980e313a3a26/interfacesWeb/sneakers',
        { sneaker: novoProduto }
      );
      fetchProdutos(); // Recarregar os produtos após adicionar
      setNovoProduto({ name: '', price: '', image: '' });
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      alert('Erro ao adicionar produto!');
    }
  };

  // Função para editar um produto
  const handleEditarProduto = (produto) => {
    setEditandoProduto(produto);
    setNovoProduto({ name: produto.name, price: produto.price, image: produto.image });
  };

  // Função para guardar a edição de um produto
  const handleSalvarEdicao = async () => {
    try {
      await axios.put(
        `https://api.sheety.co/da4ef9e6c38d598207d9980e313a3a26/interfacesWeb/sneakers/${editandoProduto.id}`,
        { sneaker: novoProduto }
      );
      fetchProdutos(); // Recarregar os produtos após editar
      setEditandoProduto(null);
      setNovoProduto({ name: '', price: '', image: '' });
    } catch (error) {
      console.error('Erro ao editar produto:', error);
      alert('Erro ao editar produto!');
    }
  };

  // Função para excluir um produto
  const handleExcluirProduto = async (id) => {
    try {
      await axios.delete(
        `https://api.sheety.co/da4ef9e6c38d598207d9980e313a3a26/interfacesWeb/sneakers/${id}`
      );
      fetchProdutos(); // Recarregar os produtos após excluir
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      alert('Erro ao excluir produto!');
    }
  };

  return (
    <div>
      <h2>Admin - Gerenciar Produtos</h2>


      <h3>Lista de Produtos</h3>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            <img src={produto.image} alt={produto.name} width="100" />
            <p>{produto.name} - {produto.price}</p>
            <button onClick={() => handleEditarProduto(produto)}>Editar</button>
            <button onClick={() => handleExcluirProduto(produto.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <h3>{editandoProduto ? 'Editar Produto' : 'Adicionar Novo Produto'}</h3>
      <input
        type="text"
        placeholder="Nome do Produto"
        value={novoProduto.name}
        onChange={(e) => setNovoProduto({ ...novoProduto, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Preço"
        value={novoProduto.price}
        onChange={(e) => setNovoProduto({ ...novoProduto, price: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL da Imagem"
        value={novoProduto.image}
        onChange={(e) => setNovoProduto({ ...novoProduto, image: e.target.value })}
      />
      <button onClick={editandoProduto ? handleSalvarEdicao : handleAdicionarProduto}>
        {editandoProduto ? 'Guardar Edição' : 'Adicionar Produto'}
      </button>
    </div>
  );
};

export default Admin;
