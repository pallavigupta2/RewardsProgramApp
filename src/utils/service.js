import logger from "../logger";

// Mock API endpoint
const API_URL = "/data.json";

export const fetchTransactions = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const sortedTransactions = data.TRANSACTION_DATA.sort(
      (a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate)
    );
    return sortedTransactions;
  } catch (err) {
    logger.error("Failed to load transactions...", err);
    throw err;
  }
};
