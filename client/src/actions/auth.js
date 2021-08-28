import axios from '../utils/axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
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
} from '../constants/index';
import {
  saveTokenToLocalStorage,
  deleteTokenFromLocalStorage,
} from '../utils/authToken';

export const login = (email, password, errorCallback) => {
  return dispatch => {
    dispatch(request());
    axios
      .post('/auth/login', { email, password })
      .then(res => {
        const token = res.data.data;
        saveTokenToLocalStorage(token);
        dispatch(success());
      })
      .catch(err => {
        const errorMessage = getErrorFromResponse(err);
        errorCallback(errorMessage);
        dispatch(failure(errorMessage));
      });
  };
  function request() {
    return { type: LOGIN_REQUEST };
  }
  function success() {
    return { type: LOGIN_SUCCESS };
  }
  function failure(error) {
    return { type: LOGIN_FAILURE, payload: error };
  }
};

export const register = (postData, errorCallback) => {
  return dispatch => {
    dispatch(request());
    axios
      .post('/auth/register', postData)
      .then(res => {
        const token = res.data.data;
        saveTokenToLocalStorage(token);
        dispatch(success());
      })
      .catch(err => {
        const errorMessage = getErrorFromResponse(err);
        errorCallback(errorMessage);
        dispatch(failure(errorMessage));
      });
  };
  function request() {
    return { type: REGISTER_REQUEST };
  }
  function success() {
    return { type: REGISTER_SUCCESS };
  }
  function failure(error) {
    return { type: REGISTER_FAILURE, payload: error };
  }
};

export const loadUser = () => {
  return dispatch => {
    dispatch(request());
    axios
      .get('/auth/current-user')
      .then(res => dispatch(success(res.data.data)))
      .catch(() => dispatch(failure()));
  };
  function request() {
    return { type: LOAD_USER_REQUEST };
  }
  function success(data) {
    return { type: LOAD_USER_SUCCESS, payload: data };
  }
  function failure() {
    return { type: LOAD_USER_FAILURE };
  }
};

export const logout = () => {
  return dispatch => {
    dispatch(request());
    axios
      .post('/auth/logout')
      .then(() => {
        deleteTokenFromLocalStorage();
        dispatch(success());
      })
      .catch(err => dispatch(failure(getErrorFromResponse(err))));
  };
  function request() {
    return { type: LOGOUT_REQUEST };
  }
  function success() {
    return { type: LOGOUT_SUCCESS };
  }
  function failure() {
    return { type: LOGOUT_FAILURE };
  }
};

export const updatePassword = (
  currentPassword,
  newPassword,
  successCallback,
  errorCallback
) => {
  return dispatch => {
    dispatch(request());
    axios
      .put('/auth/update-password', { currentPassword, newPassword })
      .then(() => {
        successCallback();
        dispatch(success());
      })
      .catch(err => {
        const errorMessage = getErrorFromResponse(err);
        errorCallback(errorMessage);
        dispatch(failure());
      });
  };
  function request() {
    return { type: UPDATE_PASSWORD_REQUEST };
  }
  function success() {
    return { type: UPDATE_PASSWORD_SUCCESS };
  }
  function failure() {
    return { type: UPDATE_PASSWORD_FAILURE };
  }
};

export const deleteAccount = (password, successCallback, errorCallback) => {
  return dispatch => {
    dispatch(request());
    axios
      .put('/auth/delete-account', { password })
      .then(() => {
        successCallback();
        dispatch(success());
      })
      .catch(err => {
        const errorMessage = getErrorFromResponse(err);
        errorCallback(errorMessage);
        dispatch(failure());
      });
  };
  function request() {
    return { type: DELETE_ACCOUNT_REQUEST };
  }
  function success() {
    return { type: DELETE_ACCOUNT_SUCCESS };
  }
  function failure() {
    return { type: DELETE_ACCOUNT_FAILURE };
  }
};

export const forgotPassword = (email, successCallback, errorCallback) => {
  return dispatch => {
    dispatch(request());
    axios
      .put('/auth/forgot-password', { email })
      .then(() => {
        successCallback();
        dispatch(success());
      })
      .catch(err => {
        const errorMessage = getErrorFromResponse(err);
        errorCallback(errorMessage);
        dispatch(failure());
      });
  };
  function request() {
    return { type: FORGOT_PASSWORD_REQUEST };
  }
  function success() {
    return { type: FORGOT_PASSWORD_SUCCESS };
  }
  function failure() {
    return { type: FORGOT_PASSWORD_FAILURE };
  }
};

const getErrorFromResponse = err => {
  let error = 'Something went wrong!';
  const errors = err.response.data.errors;
  if (errors) {
    error = errors[0];
  }
  return error;
};
