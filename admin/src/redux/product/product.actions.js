import ProductActionTypes from './product.types';

export const fetchProductStart = (productName) => ({
  type: ProductActionTypes.FETCH_PRODUCT_START,
  payload: productName,
});

export const fetchProductSuccess = (product) => ({
  type: ProductActionTypes.FETCH_PRODUCT_SUCCESS,
  payload: product,
});

export const fetchProductsStart = () => ({
  type: ProductActionTypes.FETCH_PRODUCTS_START,
});

export const fetchProductsSuccess = (products) => ({
  type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});
export const postProductStart = (product) => ({
  type: ProductActionTypes.POST_PRODUCT_START,
  payload: product,
});

export const postProductSuccess = () => ({
  type: ProductActionTypes.POST_PRODUCT_SUCCESS,
});

export const apiProductFailure = (errorMessage) => ({
  type: ProductActionTypes.API_PRODUCTS_FAILURE,
  payload: errorMessage,
});
export const deleteProductStart = () => ({
  type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
});
export const deleteProductSuccess = (id) => ({
  type: ProductActionTypes.DELETE_PRODUCTS_SUCCESS,
  payload: id,
});
