/**
 * @desc Takes a number and returns as a currency formatted string
 * @param {number} amount
 * @returns {string} formattedAmount
 */

const currency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const formatter = {
  currency,
};

export default formatter;
