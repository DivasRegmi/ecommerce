import AdminActionTypes from './admin.types';

export const signInSuccess = (admin) => ({
  type: AdminActionTypes.SIGN_IN_SUCCESS,
  payload: admin,
});

export const signInFailure = (error) => ({
  type: AdminActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const emailSignInStart = (emailAndPassword) => ({
  type: AdminActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
});

export const checkAdminSession = () => ({
  type: AdminActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: AdminActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: AdminActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: AdminActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (userCredentials) => ({
  type: AdminActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: AdminActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});

export const signUpFailure = (error) => ({
  type: AdminActionTypes.SIGN_UP_FAILURE,
  payload: error,
});
