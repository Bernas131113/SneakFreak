import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductsGrid.css';

const ProductsGrid = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);

  const SHEETY_API_URL = 'https://api.sheety.co/a27d85010a5efc145cde9cef8cc83c46/interfacesWeb/sneakers';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(SHEETY_API_URL);
        console.log(response.data.sneakers); 
        setProducts(response.data.sneakers);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="products-grid">
      <h2>Novidades</h2>
      {loading ? (
        <p>A carregar os produtos...</p>
      ) : (
        <div className="grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} /> 
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button className="buy-btn">Comprar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
