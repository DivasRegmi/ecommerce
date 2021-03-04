import { takeLatest, call, put, all } from 'redux-saga/effects';

import {
  apiProductFailure,
  fetchProductsSuccess,
  fetchProductSuccess,
} from './product.actions';

import ProductActionTypes from './product.types';

import { getProductById, getAllProducts } from '../../api/product';

export function* fetchProductAsync({ payload: productId }) {
  try {
    const product = yield call(getProductById, productId);
    yield put(fetchProductSuccess(product.data));
  } catch (error) {
    yield put(apiProductFailure(error.message));
  }
}
export function* fetchProductsAsync() {
  try {
    const products = yield call(getAllProducts);
    yield put(fetchProductsSuccess(products.data));
  } catch (error) {
    yield put(apiProductFailure(error.message));
  }
}
export function* deleteProductsAsync() {
  try {
    const products = yield call(getAllProducts);
    yield put(fetchProductsSuccess(products.data));
  } catch (error) {
    yield put(apiProductFailure(error.message));
  }
}

export function* fetchProductsStart() {
  yield takeLatest(ProductActionTypes.FETCH_PRODUCTS_START, fetchProductsAsync);
}
export function* fetchProductStart() {
  yield takeLatest(ProductActionTypes.FETCH_PRODUCT_START, fetchProductAsync);
}

export function* productSagas() {
  yield all([call(fetchProductsStart), call(fetchProductStart)]);
}
