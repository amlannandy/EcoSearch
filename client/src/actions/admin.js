import axios from "../utils/axios";
import {
  GET_RESEARCHERS_REQUEST,
  GET_RESEARCHERS_SUCCESS,
  GET_RESEARCHERS_FAILURE,
  GET_ADMIN_RECORDS_REQUEST,
  GET_ADMIN_RECORDS_SUCCESS,
  GET_ADMIN_RECORDS_FAILURE,
} from "../constants/index";

export const getResearchers = () => {
  return dispatch => {
    dispatch(request());
    axios
      .get("/admin/researchers")
      .then(res => {
        const researchers = res.data.data;
        dispatch(success(researchers));
      })
      .catch(err => {
        const errorMessage = getErrorFromResponse(err);
        dispatch(failure(errorMessage));
      });
  };
  function request() {
    return { type: GET_RESEARCHERS_REQUEST };
  }
  function success(data) {
    return { type: GET_RESEARCHERS_SUCCESS, payload: data };
  }
  function failure(error) {
    return { type: GET_RESEARCHERS_FAILURE, payload: error };
  }
};

export const getRecords = () => {
  return dispatch => {
    dispatch(request());
    axios
      .get("/admin/records")
      .then(res => {
        const records = res.data.data;
        dispatch(success(records));
      })
      .catch(err => {
        const errorMessage = getErrorFromResponse(err);
        dispatch(failure(errorMessage));
      });
  };
  function request() {
    return { type: GET_ADMIN_RECORDS_REQUEST };
  }
  function success(data) {
    return { type: GET_ADMIN_RECORDS_SUCCESS, payload: data };
  }
  function failure(error) {
    return { type: GET_ADMIN_RECORDS_FAILURE, payload: error };
  }
};

const getErrorFromResponse = err => {
  let error = "Something went wrong!";
  const errors = err.response.data.errors;
  if (errors) {
    error = errors[0];
  }
  return error;
};
