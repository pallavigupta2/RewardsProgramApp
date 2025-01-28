import React from "react";

const MonthRewards = ({ monthlyRewards }) => {
  return (
    <div className="card">
      <h2 className="card-title">User Monthly Rewards</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Month</th>
            <th>Year</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(monthlyRewards).map((reward, index) => (
            <tr key={index}>
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

export default MonthRewards;
