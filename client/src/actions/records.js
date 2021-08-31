import axios from '../utils/axios';
import {
  FETCH_ALL_RECORDS_REQUEST,
  FETCH_ALL_RECORDS_SUCCESS,
  FETCH_ALL_RECORDS_FAILURE,
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

const getErrorFromResponse = err => {
  let error = 'Something went wrong!';
  const errors = err.response.data.errors;
  if (errors) {
    error = errors[0];
  }
  return error;
};
