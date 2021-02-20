import { takeLatest, call, put, all } from 'redux-saga/effects';

import { fetchProductFailure, fetchProductSuccess } from './product.actions';

import ProductActionTypes from './product.types';

import axios from 'axios';

export function* fetchProductsAsync() {
  try {
    const products = yield axios.get('/api/product/');
    console.log(products.data);
    yield put(fetchProductSuccess(products.data));
  } catch (error) {
    yield put(fetchProductFailure(error.message));
  }
}

export function* fetchProductsStart() {
  yield takeLatest(ProductActionTypes.FETCH_PRODUCTS_START, fetchProductsAsync);
}

export function* productSagas() {
  yield all([call(fetchProductsStart)]);
}
