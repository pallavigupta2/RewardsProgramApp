import React from "react";
import PropTypes from "prop-types";
import { calculatePoints } from "../utils/rewardspoints";
import Error from "./Error";

const TransactionDetails = ({ transactions }) => {
  return !transactions?.length ? (
    <Error message="No Transaction Found" />
  ) : (
    <div className="card">
      <h2 className="card-title" data-testId="transaction">
        Transactions
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Customer Name</th>
            <th>Purchase Date</th>
            <th>Product</th>
            <th>Price</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => {
            const price = parseFloat(transaction.price) || 0;
            return (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.customerName}</td>
                <td>{transaction.purchaseDate}</td>
                <td>{transaction.productName}</td>
                <td>${price}</td>
                <td>{calculatePoints(price)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
TransactionDetails.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      customerID: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      purchaseDate: PropTypes.string.isRequired,
      productName: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
};
export default TransactionDetails;
