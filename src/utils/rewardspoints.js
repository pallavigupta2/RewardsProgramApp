// Helper function to calculate reward points
export const calculatePoints = (price) => {
  let points = 0;
  const roundedPrice = Math.floor(price);

  if (roundedPrice > 100) {
    points += 2 * (roundedPrice - 100);
    points += 50;
  } else if (roundedPrice > 50) {
    points += roundedPrice - 50;
  }

  return points;
};

// Function to calculate last 3 months rewards
export const calculateLastThreeMonthsRewards = (transactions) => {
  const today = new Date();
  const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);

  const filteredTransactions = transactions.filter(({ purchaseDate }) => {
    const date = new Date(purchaseDate);
    return date >= threeMonthsAgo && date <= today;
  });

  // Aggregate reward points by customer
  return filteredTransactions.reduce((acc, { customerName, price }) => {
    const points = calculatePoints(price);
    if (!acc[customerName]) {
      acc[customerName] = { customerName, rewardPoints: 0 };
    }
    acc[customerName].rewardPoints += points;
    return acc;
  }, {});
};

// Function to calculate Monhtly Reward
export function aggregateMonthlyRewards(transactions) {
  return transactions.reduce((acc, transaction) => {
    const { customerID, customerName, purchaseDate, price } = transaction;
    const date = new Date(purchaseDate);
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    const rewardPoints = calculatePoints(price);
    const key = `${customerName}-${year}-${month}`;
    if (!acc[key]) {
      acc[key] = {
        customerID,
        customerName,
        month,
        year,
        rewardPoints: 0,
      };
    }
    acc[key].rewardPoints += rewardPoints;
    return acc;
  }, {});
}
