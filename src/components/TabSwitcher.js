import React from "react";
import TransactionDetails from "./TransactionDetails";
import TotalRewards from "./TotalRewards";
import MonthRewards from "./MonthRewards";
import PropTypes from "prop-types";

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
TabSwitcher.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
};
export default TabSwitcher;
