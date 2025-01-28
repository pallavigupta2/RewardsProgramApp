import { TRANSACTION_DATA } from "./mockData";

// Helper function to calculate reward points
export const calculatePoints = (price) => {
  let points = 0;
  if (price > 100) {
    points += 2 * (price - 100);
    points += 1 * 50;
  } else if (price > 50) {
    points += 1 * (price - 50);
  }
  return points;
};

// Mock API endpoint
export const fetchTransactions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(TRANSACTION_DATA);
    }, 1000);
  });
};
