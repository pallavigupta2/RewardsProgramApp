import React, { useMemo } from "react";
import { calculatePoints } from "../utils/rewardspoints";
import PropTypes from "prop-types";
import Error from "./Error";

function aggregateMonthlyRewards(transactions) {
  return transactions.reduce((acc, transaction) => {
    const { customerID, customerName, purchaseDate, price } = transaction;
    const date = new Date(purchaseDate);
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    const rewardPoints = calculatePoints(price);
    const key = `${customerName}-${year}-${month}`;
    if (!acc[key]) {
      acc[key] = {
        customerID,
        customerName,
        month,
        year,
        rewardPoints: 0,
      };
    }
    acc[key].rewardPoints += rewardPoints;
    return acc;
  }, {});
}

const MonthRewards = ({ transactions }) => {
  const monthlyRewards = useMemo(
    () => aggregateMonthlyRewards(transactions),
    [transactions]
  );
  return !Object.values(monthlyRewards).length ? (
    <Error message="No Monhtly Transaction Found" />
  ) : (
    <div className="card">
      <h2 className="card-title" data-testid="monthly-reward">
        User Monthly Rewards
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Month</th>
            <th>Year</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(monthlyRewards)?.map((reward, index) => (
            <tr key={index}>
              <td>{reward.customerID}</td>
              <td>{reward.customerName}</td>
              <td>{reward.month}</td>
              <td>{reward.year}</td>
              <td>{reward.rewardPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
MonthRewards.propTypes = {
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
export default MonthRewards;
