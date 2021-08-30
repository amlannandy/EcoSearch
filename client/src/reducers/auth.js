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
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  UPDATE_INFO_REQUEST,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO_FAILURE,
} from '../constants/index';

const initialState = {
  user: null,
  authActions: {
    error: null,
    message: null,
    isLoading: false,
    isUpdating: false,
    isResetting: false,
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
    case UPDATE_INFO_REQUEST:
    case UPLOAD_IMAGE_REQUEST:
    case DELETE_ACCOUNT_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isUpdating: true,
        },
      };
    case UPDATE_INFO_SUCCESS:
    case UPLOAD_IMAGE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isUpdating: false,
        },
      };
    case UPDATE_INFO_FAILURE:
    case UPLOAD_IMAGE_FAILURE:
    case DELETE_ACCOUNT_FAILURE:
    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isUpdating: false,
          error: payload,
        },
      };
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        user: null,
        authActions: {
          ...state.authActions,
          isUpdating: false,
          isAuthenticated: false,
        },
      };
    case RESET_PASSWORD_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isResetting: true,
        },
      };
    case RESET_PASSWORD_SUCCESS:
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isResetting: false,
        },
      };
    case RESET_PASSWORD_FAILURE:
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isResetting: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default auth;
