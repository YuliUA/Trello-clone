const { isEmail, isValidPassword, isEmpty, isNotTooLong } = require('./common');
const UserEnum = require('../enums/user');
const { ValidationError } = require('../errors/Errors');

module.exports = function validateRegister(data) {
  const errors = {};

  if (isEmpty(data.firstname)) {
    console.log('empty name!');
    errors.firstname = UserEnum.error.firstNameEmpty;
  } else if (!isNotTooLong(data.firstname)) {
    errors.firstname = UserEnum.error.tooLong;
  }

  if (isEmpty(data.lastname)) {
    errors.lastname = UserEnum.error.lastnameEmpty;
  } else if (!isNotTooLong(data.lastname)) {
    errors.lastname = UserEnum.error.tooLong;
  }

  if (isEmpty(data.email)) {
    errors.email = UserEnum.error.emailEmpty;
  } else if (!isNotTooLong(data.email)) {
    errors.email = UserEnum.error.tooLong;
  } else if (!isEmail(data.email)) {
    errors.email = UserEnum.error.emailInvalid;
  }

  if (isEmpty(data.password)) {
    errors.password = UserEnum.error.passwordEmpty;
  } else if (isValidPassword(data.password) !== true) {
    errors.password = UserEnum.error.passwordInvalid;
  }
  if (isEmpty(data.password2)) {
    errors.password2 = UserEnum.error.password2Empty;
  } else if (data.password !== data.password2) {
    errors.password2 = UserEnum.error.password2NotMatch;
  }

  if (!isEmpty(errors)) {
    throw new ValidationError('Errors during validation of input fields', errors);
  }
};