import CategorieActionTypes from './categorie.types';

const INITIAL_STATE = {
  categories: [''],
  subCategories: [''],
  isCategorieFetching: false,
  isSubCategorieFatching: false,
  errorMessage: undefined,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CategorieActionTypes.FETCH_CATEGORIES_START:
    case CategorieActionTypes.POST_CATEGORIES_START:
    case CategorieActionTypes.EDIT_CATEGORIES_START:
    case CategorieActionTypes.DELETE_CATEGORIES_START:
      return {
        ...state,
        isCategorieFetching: true,
      };
    case CategorieActionTypes.FETCH_SUBCATEGORIES_START:
    case CategorieActionTypes.POST_SUBCATEGORIES_START:
    case CategorieActionTypes.EDIT_SUBCATEGORIES_START:
    case CategorieActionTypes.DELETE_SUBCATEGORIES_START:
      return {
        ...state,
        isSubCategorieFatching: true,
      };
    case CategorieActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isCategorieFetching: false,
        categories: action.payload,
      };
    case CategorieActionTypes.FETCH_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        isSubCategorieFatching: false,
        subCategories: action.payload,
      };
    case CategorieActionTypes.API_CATEGORIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
