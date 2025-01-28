import React, { useEffect, useState } from "react";
import "../App.css";
import { calculatePoints, fetchTransactions } from "../utils/rewardspoints";
import TotalRewards from "./TotalRewards";
import MonthRewards from "./MonthRewards";
import TransactionDetails from "./TransactionDetails";

const Rewards = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const data = await fetchTransactions();
    const filteredData = data.filter((transaction) => {
      const date = new Date(transaction.purchaseDate);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return date >= threeMonthsAgo;
    });
    const enrichedData = filteredData.map((transaction) => ({
      ...transaction,
      rewardPoints: calculatePoints(transaction.price),
    }));
    setTransactions(enrichedData);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  // Aggregate rewards per customer per month
  const monthlyRewards = transactions.reduce((acc, transaction) => {
    const { customerName, purchaseDate, rewardPoints } = transaction;
    const [year, month] = purchaseDate.split("-").slice(0, 2);
    const key = `${customerName}-${year}-${month}`;
    acc[key] = acc[key] || { customerName, year, month, rewardPoints: 0 };
    acc[key].rewardPoints += rewardPoints;
    return acc;
  }, {});

  const totalRewards = transactions.reduce((acc, transaction) => {
    const { customerName, rewardPoints } = transaction;
    acc[customerName] = acc[customerName] || { customerName, rewardPoints: 0 };
    acc[customerName].rewardPoints += rewardPoints;
    return acc;
  }, {});
  return (
    <div className="container">
      <h1 className="title">Customer Rewards Program</h1>

      {loading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <div className="grid">
          <MonthRewards monthlyRewards={monthlyRewards} />
          <TotalRewards totalRewards={totalRewards} />
          <TransactionDetails transactions={transactions} />
        </div>
      )}
    </div>
  );
};

export default Rewards;
