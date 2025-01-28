import React from "react";

const TransactionDetails = ({ transactions }) => {
  return (
    <div className="card">
      <h2 className="card-title">Transactions</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Customer Name</th>
            <th>Purchase Date</th>
            <th>Price</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.customerName}</td>
              <td>{transaction.purchaseDate}</td>
              <td>${transaction.price.toFixed(2)}</td>
              <td>{transaction.rewardPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionDetails;
