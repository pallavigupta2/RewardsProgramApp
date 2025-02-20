import { useState, useEffect } from "react";
import { fetchTransactions } from "../utils/Services";
import logger from "../logger";
import Header from "../components/Header";
import LoadingIndicator from "../components/common/LoadingIndicator";
import TabSwitcher from "../components/TabSwitcher";
import ErrorNotification from "../components/common/ErrorNotification";

const RewardsDashboard = () => {
  const [activeTab, setActiveTab] = useState("transactions");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchTransactions();

      setTransactions(data);
    } catch (err) {
      setError("Failed to fetch transactions. Please try again.");
      logger.error("Failed to load transactions", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <Header setActiveTab={setActiveTab} activeTab={activeTab} />
      {loading ? (
        <LoadingIndicator message="Loading Transactions..." />
      ) : error ? (
        <ErrorNotification message={error} />
      ) : (
        <TabSwitcher activeTab={activeTab} transactions={transactions} />
      )}
    </div>
  );
};

export default RewardsDashboard;
