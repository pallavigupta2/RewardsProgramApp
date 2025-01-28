import React from "react";

const TotalRewards = ({ totalRewards }) => {
  return (
    <div className="card">
      <h2 className="card-title">Total Rewards</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Total Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(totalRewards).map((reward, index) => (
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

export default TotalRewards;
