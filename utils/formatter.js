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

/**
 *
 * @param {string} value
 * @returns {boolean} true or false
 */
const validateEmailFormat = (value) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return true;
  }

  return false;
};

const formatter = {
  currency,
  date,
  validateEmailFormat,
};

export default formatter;
