import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductsGrid.css';

const ProductsGrid = ({ addToCart, searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const SHEETY_API_URL = 'https://api.sheety.co/da4ef9e6c38d598207d9980e313a3a26/interfacesWeb/sneakers';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(SHEETY_API_URL);
        setProducts(response.data.sneakers);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao procurar dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-grid">
      <h2>Novidades</h2>
      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <div className="grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
