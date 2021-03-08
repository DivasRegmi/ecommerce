import { takeLatest, call, put, all } from 'redux-saga/effects';

import {
  apiProductFailure,
  fetchProductsSuccess,
  fetchProductSuccess,
  postProductSuccess,
} from './product.actions';

import ProductActionTypes from './product.types';

import { getProductById, getAllProducts, postProduct } from '../../api/product';

export function* fetchProductAsync({ payload: productId }) {
  try {
    const product = yield call(getProductById, productId);
    console.log(product.data);
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
export function* postProductAsync({ payload }) {
  try {
    yield call(postProduct, payload);
    yield put(postProductSuccess());
  } catch (error) {
    yield put(apiProductFailure(error.response.data));
  }
}
// export function* deleteProductsAsync() {
//   try {
//     const products = yield call(getAllProducts);
//     yield put(fetchProductsSuccess(products.data));
//   } catch (error) {
//     yield put(apiProductFailure(error.message));
//   }
// }

export function* fetchProductStart() {
  yield takeLatest(ProductActionTypes.FETCH_PRODUCT_START, fetchProductAsync);
}
export function* fetchProductsStart() {
  yield takeLatest(ProductActionTypes.FETCH_PRODUCTS_START, fetchProductsAsync);
}
export function* postProductStart() {
  yield takeLatest(ProductActionTypes.POST_PRODUCT_START, postProductAsync);
}

export function* productSagas() {
  yield all([
    call(fetchProductStart),
    call(fetchProductsStart),
    call(postProductStart),
  ]);
}
