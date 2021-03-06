/* eslint-disable no-param-reassign */
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSubCategorieInput(data) {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.categorieId = !isEmpty(data.categorieId) ? data.categorieId : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
