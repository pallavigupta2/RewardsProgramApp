import React from "react";
import PropTypes from "prop-types";
import "../App.css";

const Header = ({ setActiveTab, activeTab }) => {
  return (
    <div className="header">
      <div className="logo">
        <span>Rewardify</span>
      </div>
      <nav className="nav">
        <button
          onClick={() => setActiveTab("transactions")}
          className={activeTab === "transactions" ? "active" : ""}
        >
          Transactions
        </button>
        <button
          onClick={() => setActiveTab("totalRewards")}
          className={activeTab === "totalRewards" ? "active" : ""}
        >
          Total Rewards
        </button>
        <button
          onClick={() => setActiveTab("userMonthlyRewards")}
          className={activeTab === "userMonthlyRewards" ? "active" : ""}
        >
          User Monthly Rewards
        </button>
      </nav>
    </div>
  );
};
Header.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
};
export default Header;
