// Helper function to formate price
export function formatPrice(price) {
  const validPrice = parseFloat(price);
  return isNaN(validPrice) ? 0.0 : validPrice.toFixed(2);
}

// Helper function to calculate reward points
export const calculatePoints = (price) => {
  let points = 0;
  const roundedPrice = Math.floor(formatPrice(price));

  if (roundedPrice > 100) {
    points += 2 * (roundedPrice - 100);
    points += 50;
  } else if (roundedPrice > 50) {
    points += roundedPrice - 50;
  }
  return points;
};

// Helper function to get the latest transaction date
const getLatestTransactionDate = (transactions) => {
  return new Date(
    Math.max(
      ...transactions.map(({ purchaseDate }) => {
        const date = new Date(purchaseDate);
        return isNaN(date.getTime()) ? -Infinity : date;
      })
    )
  );
};

// Function to filter transactions within the latest 3 consecutive months
const filterLastThreeMonthsTransactions = (transactions) => {
  if (!transactions || transactions.length === 0) return [];

  const latestDate = getLatestTransactionDate(transactions);
  const threeMonthsAgo = new Date(
    latestDate.getFullYear(),
    latestDate.getMonth() - 2,
    1
  );

  return transactions.filter(({ purchaseDate }) => {
    const date = new Date(purchaseDate);
    return date >= threeMonthsAgo && date <= latestDate;
  });
};

// Function to aggregate latest 3 consecutive monthly rewards

export const aggregateMonthlyRewards = (transactions) => {
  const filteredTransactions = filterLastThreeMonthsTransactions(transactions);

  return filteredTransactions.reduce(
    (acc, { customerID, customerName, purchaseDate, price, id }) => {
      // Validate purchaseDate
      const date = new Date(purchaseDate);
      if (isNaN(date.getTime())) {
        return acc; // Skip invalid dates
      }

      const month = date.toLocaleString("en-US", { month: "long" });
      const year = date.getFullYear();
      const key = `${customerName}-${year}-${month}`;

      if (!acc.has(key)) {
        acc.set(key, {
          id,
          customerID,
          customerName,
          month,
          year,
          rewardPoints: 0,
        });
      }

      acc.get(key).rewardPoints += calculatePoints(price);
      return acc;
    },
    new Map()
  );
};

// Function to calculate the last three months' total rewards
export const calculateLastThreeMonthsTotalRewards = (transactions) => {
  if (!transactions || transactions.length === 0) return new Map();

  const filteredTransactions = filterLastThreeMonthsTransactions(transactions);

  return filteredTransactions.reduce((acc, { customerName, price }) => {
    const points = calculatePoints(price);
    acc.set(customerName, (acc.get(customerName) || 0) + points);
    return acc;
  }, new Map());
};
