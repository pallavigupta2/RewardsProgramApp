import React, { useMemo } from "react";
import { aggregateMonthlyRewards } from "../utils/RewardPointsCalculation";
import PropTypes from "prop-types";
import ErrorNotification from "./common/ErrorNotification";

const MonthRewards = ({ transactions }) => {
  const monthlyRewards = useMemo(
    () => aggregateMonthlyRewards(transactions),
    [transactions]
  );
  return monthlyRewards.size === 0 ? (
    <ErrorNotification message="No Monthly Transaction Found" />
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
          {Array.from(monthlyRewards.values())?.map((reward) => (
            <tr key={reward.id}>
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
