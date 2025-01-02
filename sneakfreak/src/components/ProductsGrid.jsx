import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductsGrid.css';

const ProductsGrid = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para controlar visibilidade do carrinho
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
      setIsCartOpen(false); // Fecha o carrinho após finalizar a compra
    } else {
      alert('Seu carrinho está vazio.');
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="products-grid">
      <h2>Novidades</h2>
      <button className="cart-btn" onClick={toggleCart}>
        {isCartOpen ? 'Fechar Carrinho' : 'Abrir Carrinho'}
      </button>

      {loading ? (
        <p>A carregar os produtos...</p>
      ) : (
        <div className="grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button className="buy-btn" onClick={() => addToCart(product)}>
                Comprar
              </button>
            </div>
          ))}
        </div>
      )}

      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <h2>Carrinho</h2>
        {cart.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.price}</p>
                <button onClick={() => removeFromCart(item.id)}>Remover</button>
              </div>
            ))}
            <button className="finalize-btn" onClick={finalizePurchase}>
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsGrid;