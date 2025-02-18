import React, { useMemo } from "react";
import { calculatePoints } from "../utils/RewardPointsCalculation";
import PropTypes from "prop-types";
import Error from "./Error";

// Function to aggregate monthly rewards
function aggregateMonthlyRewards(transactions) {
  return transactions.reduce(
    (acc, { customerID, customerName, purchaseDate, price }) => {
      // Validate purchaseDate
      const date = new Date(purchaseDate);
      if (isNaN(date.getTime())) {
        return acc; // Skip this transaction if the date is invalid
      }
      const month = date.toLocaleString("en-US", { month: "long" });
      const year = date.getFullYear();
      const key = `${customerName}-${year}-${month}`;
      if (!acc.has(key)) {
        acc.set(key, {
          customerID,
          customerName,
          month,
          year,
          rewardPoints: 0,
        });
      }
      acc.get(key).rewardPoints += calculatePoints(price);

      return acc;
    },
    new Map()
  );
}

const MonthRewards = ({ transactions }) => {
  const monthlyRewards = useMemo(
    () => aggregateMonthlyRewards(transactions),
    [transactions]
  );
  return monthlyRewards.size === 0 ? (
    <Error message="No Monthly Transaction Found" />
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
          {Array.from(monthlyRewards.values())?.map((reward, index) => (
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
