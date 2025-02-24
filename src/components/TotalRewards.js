import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  calculateLastThreeMonthsTotalRewards,
  sortByFieldName,
} from "../utils/Utils";
import ErrorNotification from "./common/ErrorNotification";

const TotalRewards = ({ transactions }) => {
  // Sort transactions by customerID (string type)
  const sortedTransactions = useMemo(
    () => sortByFieldName(transactions, "customerID", "string"),
    [transactions]
  );
  const totalRewards = useMemo(
    () => calculateLastThreeMonthsTotalRewards(sortedTransactions),
    [sortedTransactions]
  );
  return totalRewards.size === 0 ? (
    <ErrorNotification message="No Total Rewards Found" />
  ) : (
    <div className="card">
      <h2 className="card-title" data-testid="total-reward">
        Total Rewards for Last Three Months
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Total Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(totalRewards, ([customerName, rewardPoints]) => (
            <tr key={customerName}>
              <td>{customerName}</td>
              <td>{rewardPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
TotalRewards.propTypes = {
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
export default TotalRewards;
