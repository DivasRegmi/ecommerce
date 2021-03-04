import ProductActionTypes from './product.types';

const INITIAL_STATE = {
  products: [''],
  product: null,
  isLoading: false,
  errorMessage: undefined,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS_START:
    case ProductActionTypes.FETCH_PRODUCT_START:
      return {
        ...state,
        isLoading: true,
      };
    case ProductActionTypes.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: action.payload,
      };
    case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
    case ProductActionTypes.API_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
