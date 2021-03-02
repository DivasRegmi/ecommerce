import { takeLatest, call, put, all } from 'redux-saga/effects';

import {
  fetchCategorieSuccess,
  apiCategorieFailure,
  fetchSubCategorieSuccess,
} from './categorie.actions';
import CategorieActionTypes from './categorie.types';

import { getAllCategorie, getAllSubCategorie } from '../../api/categories';

export function* fetchCategoriesAsync() {
  try {
    const categorie = yield call(getAllCategorie);
    yield put(fetchCategorieSuccess(categorie.data));
  } catch (error) {
    yield put(apiCategorieFailure(error.message));
  }
}
export function* fetchSubCategoriesAsync() {
  try {
    const subCategorie = yield call(getAllSubCategorie);
    yield put(fetchSubCategorieSuccess(subCategorie.data));
  } catch (error) {
    yield put(apiCategorieFailure(error.message));
  }
}

export function* fetchCategorieStart() {
  yield takeLatest(
    CategorieActionTypes.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}
export function* fetchSubCategorieStart() {
  yield takeLatest(
    CategorieActionTypes.FETCH_SUBCATEGORIES_START,
    fetchSubCategoriesAsync
  );
}

export function* categorieSagas() {
  yield all([call(fetchCategorieStart), call(fetchSubCategorieStart)]);
}
