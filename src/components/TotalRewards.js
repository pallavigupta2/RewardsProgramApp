import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { calculatePoints } from "../utils/RewardPointsCalculation";
import Error from "./Error";

// Function to calculate the last three months' rewards
const calculateLastThreeMonthsRewards = (transactions) => {
  if (!transactions || transactions.length === 0) return new Map();

  // Determine the latest purchase date from dataset
  const latestDate = new Date(
    Math.max(
      ...transactions.map(({ purchaseDate }) => {
        const date = new Date(purchaseDate);
        if (isNaN(date.getTime())) {
          return -Infinity;
        }
        return date;
      })
    )
  );

  // Compute the start date of the last three months
  const threeMonthsAgo = new Date(
    latestDate.getFullYear(),
    latestDate.getMonth() - 2,
    1
  );

  // Filter transactions within the last three months
  const filteredTransactions = transactions.filter(({ purchaseDate }) => {
    const date = new Date(purchaseDate);
    return date >= threeMonthsAgo && date <= latestDate;
  });

  // Aggregate reward points using a Map
  return filteredTransactions.reduce((acc, { customerName, price }) => {
    const points = calculatePoints(price);
    acc.set(customerName, (acc.get(customerName) || 0) + points);
    return acc;
  }, new Map());
};

const TotalRewards = ({ transactions }) => {
  const totalRewards = useMemo(
    () => calculateLastThreeMonthsRewards(transactions),
    [transactions]
  );
  return totalRewards.size === 0 ? (
    <Error message="No Total Rewards Found" />
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
