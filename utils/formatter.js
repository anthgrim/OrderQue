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

/**
 * @desc Takes a date and returns an en-us formatted date
 * @param {date} date
 */
const date = (date) => {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
  return new Intl.DateTimeFormat("en-us").format(newDate);
};

const formatter = {
  currency,
  date,
};

export default formatter;
