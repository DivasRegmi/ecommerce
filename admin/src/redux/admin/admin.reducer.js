import AdminActionTypes from './admin.types';

const INITIAL_STATE = {
  currentAdmin: null,
  error: null,
};

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AdminActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentAdmin: action.payload,
        error: null,
      };
    case AdminActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentAdmin: null,
        error: null,
      };
    case AdminActionTypes.SIGN_IN_FAILURE:
    case AdminActionTypes.SIGN_OUT_FAILURE:
    case AdminActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
