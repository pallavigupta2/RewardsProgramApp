import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { calculatePoints } from "../utils/rewardspoints";
import Error from "./Error";

const calculateLastThreeMonthsRewards = (transactions) => {
  const today = new Date();
  const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);

  const filteredTransactions = transactions.filter(({ purchaseDate }) => {
    const date = new Date(purchaseDate);
    return date >= threeMonthsAgo && date <= today;
  });

  // Aggregate reward points by customer
  return filteredTransactions.reduce((acc, { customerName, price }) => {
    const points = calculatePoints(price);
    if (!acc[customerName]) {
      acc[customerName] = { customerName, rewardPoints: 0 };
    }
    acc[customerName].rewardPoints += points;
    return acc;
  }, {});
};

const TotalRewards = ({ transactions }) => {
  const totalRewards = useMemo(
    () => calculateLastThreeMonthsRewards(transactions),
    [transactions]
  );
  return !Object.values(totalRewards).length ? (
    <Error message="No Total Rewards Found" />
  ) : (
    <div className="card">
      <h2 className="card-title" data-testid="total-reward">
        Total Rewards
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Total Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(totalRewards)?.map((reward, index) => (
            <tr key={index}>
              <td>{reward.customerName}</td>
              <td>{reward.rewardPoints}</td>
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
