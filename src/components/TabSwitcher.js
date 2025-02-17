import React from "react";
import TransactionDetails from "./TransactionDetails";
import TotalRewards from "./TotalRewards";
import MonthRewards from "./MonthRewards";

const TabSwitcher = ({ activeTab, transactions }) => {
  switch (activeTab) {
    case "transactions":
      return <TransactionDetails transactions={transactions} />;
    case "totalRewards":
      return <TotalRewards transactions={transactions} />;
    case "userMonthlyRewards":
      return <MonthRewards transactions={transactions} />;
    default:
      return null;
  }
};

export default TabSwitcher;
