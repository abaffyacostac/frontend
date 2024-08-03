import React from 'react';
import BidHistory from './BidHistory';

const Product = ({ product, bidNames, handleNameChange, handleBid, errors }) => {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-description">{product.description}</p>
      <p className="product-price">Minimum Offer: ${product.minOffer}</p>
      <p className="product-price">Current Bid: ${product.currentBid}</p>
      <div className="bid-inputs">
        <input
          type="text"
          placeholder="Name"
          className="bid-name-input"
          value={bidNames[product._id] || ''}
          onChange={(e) => handleNameChange(product._id, e.target.value)}
        />
        <input
          type="number"
          min={Math.max(product.currentBid, (product.minOffer-1)) + 1}
          placeholder="Bid"
          className="bid-input"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleBid(product._id, parseFloat(e.target.value));
              e.target.value = '';
            }
          }}
        />
      </div>
      {errors && <p className="error-message">{errors}</p>}
      <BidHistory bidHistory={product.bidHistory} />
    </div>
  );
};

export default Product;
