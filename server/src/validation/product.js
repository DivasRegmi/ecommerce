/* eslint-disable no-param-reassign */
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProductInput(data) {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.markedPrice = !isEmpty(data.markedPrice) ? data.markedPrice : '';
  data.costPrice = !isEmpty(data.costPrice) ? data.costPrice : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (Validator.isEmpty(data.markedPrice)) {
    errors.markedPrice = 'MarkedPrice field is required';
  }
  if (Validator.isEmpty(data.costPrice)) {
    errors.costPrice = 'CostPrice field is required';
  }
  if (parseInt(data.costPrice, 10) < 0) {
    errors.costPrice = 'CostPrice field must be grater than 0';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
