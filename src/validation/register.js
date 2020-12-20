/* eslint-disable no-param-reassign */
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegistorInput(data) {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be 2 to 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is reqired';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be atleast 6 characters';
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm password field is reqired';
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.password = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
