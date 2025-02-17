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
