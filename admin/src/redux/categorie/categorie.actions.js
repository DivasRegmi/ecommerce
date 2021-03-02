import CategorieActionTypes from './categorie.types';

export const fetchCategorieStart = () => ({
  type: CategorieActionTypes.FETCH_CATEGORIES_START,
});
export const fetchSubCategorieStart = () => ({
  type: CategorieActionTypes.FETCH_SUBCATEGORIES_START,
});

export const fetchCategorieSuccess = (categorie) => ({
  type: CategorieActionTypes.FETCH_CATEGORIES_SUCCESS,
  payload: categorie,
});
export const fetchSubCategorieSuccess = (subCategorie) => ({
  type: CategorieActionTypes.FETCH_SUBCATEGORIES_SUCCESS,
  payload: subCategorie,
});

export const apiCategorieFailure = (errorMessage) => ({
  type: CategorieActionTypes.API_CATEGORIES_FAILURE,
  payload: errorMessage,
});
