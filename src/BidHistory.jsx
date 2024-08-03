import React from 'react';

const BidHistory = ({ bidHistory }) => {
  const getLastThreeBids = (bidHistory) => {
    if (bidHistory.length === 0) {
      return <p className="no-bid-history">No bid history</p>;
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Bid</th>
          </tr>
        </thead>
        <tbody>
          {bidHistory.slice(-3).map((bid, index) => (
            <tr key={index}>
              <td>{bid.name}</td>
              <td>${bid.bid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="bid-history">
      <h3>Bid History</h3>
      {getLastThreeBids(bidHistory)}
    </div>
  );
};

export default BidHistory;
