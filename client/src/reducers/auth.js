import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
} from '../constants/index';

const initialState = {
  user: null,
  authActions: {
    error: null,
    message: null,
    isInitialized: false,
    isAuthenticated: false,
    isAuthenticating: false,
  },
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isAuthenticating: true,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isAuthenticated: true,
          isAuthenticating: false,
        },
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          error: payload,
          isAuthenticating: false,
        },
      };
    default:
      return state;
  }
};

export default auth;
