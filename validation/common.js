const isEmail = email => /\S+@\S+\.\S+/.test(email);

const isValidPassword = password => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(password);

const isEmpty = value => value === undefined
    || value === null
    || (typeof value === 'object' && Object.keys(value).length === 0)
    || (typeof value === 'string' && value.trim().length === 0);

const isNotTooLong = value => (typeof value === 'object' && Object.keys(value).length <= 45)
|| (typeof value === 'string' && value.trim().length <= 45);
module.exports = {
  isEmail,
  isValidPassword,
  isEmpty,
  isNotTooLong
};