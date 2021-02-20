import ProductActionTypes from './product.types';

export const fetchProductStart = () => ({
  type: ProductActionTypes.FETCH_PRODUCTS_START,
});

export const fetchProductSuccess = (products) => ({
  type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductFailure = (errorMessage) => ({
  type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
  payload: errorMessage,
});
