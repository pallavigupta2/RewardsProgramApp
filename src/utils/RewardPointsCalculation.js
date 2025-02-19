// Helper function to formate price
export function formatPrice(price) {
  const validPrice = parseFloat(price);
  return isNaN(validPrice) ? "0.00" : validPrice.toFixed(2);
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

// Function to aggregate monthly rewards
export const aggregateMonthlyRewards = (transactions) => {
  return transactions.reduce(
    (acc, { customerID, customerName, purchaseDate, price, id }) => {
      // Validate purchaseDate
      const date = new Date(purchaseDate);
      if (isNaN(date.getTime())) {
        return acc; // Skip this transaction if the date is invalid
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

// Function to calculate the last three months' rewards
export const calculateLastThreeMonthsRewards = (transactions) => {
  if (!transactions || transactions.length === 0) return new Map();

  // Determine the latest purchase date from dataset
  const latestDate = new Date(
    Math.max(
      ...transactions.map(({ purchaseDate }) => {
        const date = new Date(purchaseDate);
        if (isNaN(date.getTime())) {
          return -Infinity;
        }
        return date;
      })
    )
  );

  // Compute the start date of the last three months
  const threeMonthsAgo = new Date(
    latestDate.getFullYear(),
    latestDate.getMonth() - 2,
    1
  );

  // Filter transactions within the last three months
  const filteredTransactions = transactions.filter(({ purchaseDate }) => {
    const date = new Date(purchaseDate);
    return date >= threeMonthsAgo && date <= latestDate;
  });

  // Aggregate reward points using a Map
  return filteredTransactions.reduce((acc, { customerName, price }) => {
    const points = calculatePoints(price);
    acc.set(customerName, (acc.get(customerName) || 0) + points);
    return acc;
  }, new Map());
};
