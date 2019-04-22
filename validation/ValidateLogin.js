const { isEmail, isValidPassword, isEmpty } = require('./common');
const UserEnum = require('../enums/user');
const { ValidationError } = require('../errors/Errors');

module.exports = function validateLogin(data) {
  const errors = {};

  if (isEmpty(data.email)) {
    errors.email = UserEnum.error.emailEmpty;
  } else if (!isEmail(data.email)) {
    errors.email = UserEnum.error.emailInvalid;
  }
  if (isEmpty(data.password)) {
    errors.password = UserEnum.error.passwordEmpty;
  } 
 
  if (!isEmpty(errors)) {
    throw new ValidationError('Errors during validation of input fields', errors);
  }
};