import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../constants/index';

const initialState = {
  user: null,
  authActions: {
    error: null,
    message: null,
    isLoading: false,
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
    case LOAD_USER_REQUEST:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isLoading: true,
        },
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        authActions: {
          ...state.authActions,
          isLoading: false,
          isInitialized: true,
          isAuthenticated: true,
        },
      };
    case LOAD_USER_FAILURE:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isLoading: false,
          isInitialized: true,
        },
      };
    default:
      return state;
  }
};

export default auth;
