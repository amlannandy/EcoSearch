import axios from '../utils/axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../constants/index';
import { saveTokenToLocalStorage } from '../utils/authToken';

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

const getErrorFromResponse = err => {
  let error = 'Something went wrong!';
  const errors = err.response.data.errors;
  if (errors) {
    error = errors[0];
  }
  return error;
};
