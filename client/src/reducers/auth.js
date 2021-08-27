import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
} from '../constants/index';

const initialState = {
  user: null,
  authActions: {
    error: null,
    message: null,
    isLoading: false,
    isUpdating: false,
    isInitialized: false,
    isAuthenticated: false,
    isAuthenticating: false,
  },
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isAuthenticating: true,
        },
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isAuthenticated: true,
          isAuthenticating: false,
        },
      };
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
    case REGISTER_FAILURE:
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
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        authActions: {
          ...state.authActions,
          isAuthenticating: false,
          isAuthenticated: false,
        },
      };
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isUpdating: true,
        },
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isUpdating: false,
        },
      };
    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isUpdating: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default auth;
