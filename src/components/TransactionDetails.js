import React from "react";
import PropTypes from "prop-types";
import { calculatePoints, formatPrice, sortByFieldName } from "../utils/Utils";
import ErrorNotification from "./common/ErrorNotification";

const TransactionDetails = ({ transactions }) => {
  const sortedTransactions = sortByFieldName(
    transactions,
    "purchaseDate",
    "date"
  );

  return !sortedTransactions?.length ? (
    <ErrorNotification message="No Transaction Found" />
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
          {sortedTransactions?.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.customerName}</td>
                <td>{transaction.purchaseDate}</td>
                <td>{transaction.productName}</td>
                <td>${formatPrice(transaction.price)}</td>
                <td className="right-aligned">
                  {calculatePoints(transaction.price)}
                </td>
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
