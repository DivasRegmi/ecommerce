import ProductActionTypes from './product.types';

const INITIAL_STATE = {
  products: [''],
  product: null,
  isLoading: false,
  error: undefined,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS_START:
    case ProductActionTypes.FETCH_PRODUCT_START:
    case ProductActionTypes.POST_PRODUCT_START:
      return {
        ...state,
        isLoading: true,
      };
    case ProductActionTypes.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: action.payload,
        error: undefined,
      };
    case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        error: undefined,
      };
    case ProductActionTypes.POST_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: action.payload,
        error: undefined,
      };
    case ProductActionTypes.API_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
