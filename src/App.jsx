import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import Header from './Header';
import Footer from './Footer';
import Product from './Product';

const App = () => {
  const [products, setProducts] = useState([]);
  const [bidNames, setBidNames] = useState({});
  const [errors, setErrors] = useState({}); // To track errors

  // const url = 'http://localhost:5000/api/products'
  const url = 'https://backend-dzw1.onrender.com/api/products'

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(url);
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const handleBid = async (id, bid) => {
    const name = bidNames[id];
    const product = products.find((product) => product._id === id);

    // Validate name and bid
    if (!name || !name.trim()) {
      setErrors((prev) => ({ ...prev, [id]: 'Name cannot be empty.' }));
      return;
    }
    if (bid <= product.currentBid || bid < product.minOffer) {
      setErrors((prev) => ({ ...prev, [id]: 'Bid must be greater than the current bid and minimum offer.' }));
      return;
    }

    try {
      await axios.post(url+`/${id}/bid`, { bid, name });
      const updatedProducts = await axios.get(url);
      setProducts(updatedProducts.data);
      setBidNames((prev) => ({ ...prev, [id]: '' }));
      setErrors((prev) => ({ ...prev, [id]: '' }));
    } catch (error) {
      console.error('Error making bid:', error);
    }
  };

  const handleNameChange = (id, value) => {
    setBidNames((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="container">
      <Header />
      <div className="grid">
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            bidNames={bidNames}
            handleNameChange={handleNameChange}
            handleBid={handleBid}
            errors={errors[product._id]}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default App;
