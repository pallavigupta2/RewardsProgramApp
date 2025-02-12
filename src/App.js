import "./App.css";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import TransactionDetails from "./components/TransactionDetails";
import TotalRewards from "./components/TotalRewards";
import MonthRewards from "./components/MonthRewards";
import logger from "./logger";
import LoadingIndicator from "./components/LoadingIndicator";
import Error from "./components/Error";
import { fetchTransactions } from "../src/utils/service";

function App() {
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
        <Error message={error} />
      ) : activeTab === "transactions" ? (
        <TransactionDetails transactions={transactions} />
      ) : activeTab === "totalRewards" ? (
        <TotalRewards transactions={transactions} />
      ) : (
        <MonthRewards transactions={transactions} />
      )}
    </div>
  );
}

export default App;
