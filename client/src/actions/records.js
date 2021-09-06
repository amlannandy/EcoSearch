import axios from '../utils/axios';
import {
  ADD_RECORD_REQUEST,
  ADD_RECORD_SUCCESS,
  ADD_RECORD_FAILURE,
  FETCH_ALL_RECORDS_REQUEST,
  FETCH_ALL_RECORDS_SUCCESS,
  FETCH_ALL_RECORDS_FAILURE,
  FETCH_USER_RECORDS_REQUEST,
  FETCH_USER_RECORDS_SUCCESS,
  FETCH_USER_RECORDS_FAILURE,
} from '../constants/index';

export const fetchAllRecords = () => {
  return dispatch => {
    dispatch(request());
    axios
      .get('/records/explore')
      .then(res => dispatch(success(res.data.data)))
      .catch(err => dispatch(failure(getErrorFromResponse(err))));
  };
  function request() {
    return { type: FETCH_ALL_RECORDS_REQUEST };
  }
  function success(data) {
    return { type: FETCH_ALL_RECORDS_SUCCESS, payload: data };
  }
  function failure(err) {
    return { type: FETCH_ALL_RECORDS_FAILURE, payload: err };
  }
};

export const fetchUserRecords = () => {
  return dispatch => {
    dispatch(request());
    axios
      .get('/records')
      .then(res => dispatch(success(res.data.data)))
      .catch(err => dispatch(failure(getErrorFromResponse(err))));
  };
  function request() {
    return { type: FETCH_USER_RECORDS_REQUEST };
  }
  function success(data) {
    return { type: FETCH_USER_RECORDS_SUCCESS, payload: data };
  }
  function failure(err) {
    return { type: FETCH_USER_RECORDS_FAILURE, payload: err };
  }
};

export const addRecord = (data, successCallback, errorCallback) => {
  return dispatch => {
    dispatch(request());
    let formData = new FormData();
    formData.append('file', data.image);
    axios
      .post('/records/upload-image', formData)
      .then(res => {
        const imageUrl = res.data.data;
        let postData = { ...data, imageUrl };
        delete postData.image;
        axios
          .post('/records/create', postData)
          .then(() => {
            dispatch(success());
            successCallback();
          })
          .catch(err => {
            const errorMessage = getErrorFromResponse(err);
            dispatch(failure(errorMessage));
            errorCallback(errorMessage);
          });
      })
      .catch(err => {
        const errorMessage = getErrorFromResponse(err);
        dispatch(failure(errorMessage));
        errorCallback(errorMessage);
      });
  };
  function request() {
    return { type: ADD_RECORD_REQUEST };
  }
  function success() {
    return { type: ADD_RECORD_SUCCESS };
  }
  function failure(err) {
    return { type: ADD_RECORD_FAILURE, payload: err };
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
