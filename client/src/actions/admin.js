import axios from "../utils/axios";
import {
  GET_RESEARCHERS_REQUEST,
  GET_RESEARCHERS_SUCCESS,
  GET_RESEARCHERS_FAILURE,
  GET_ADMIN_RECORDS_REQUEST,
  GET_ADMIN_RECORDS_SUCCESS,
  GET_ADMIN_RECORDS_FAILURE,
  VERIFY_RESEARCHER_REQUEST,
  VERIFY_RESEARCHER_SUCCESS,
  VERIFY_RESEARCHER_FAILURE,
  BLOCK_RESEARCHER_REQUEST,
  BLOCK_RESEARCHER_SUCCESS,
  BLOCK_RESEARCHER_FAILURE,
  VERIFY_RECORDS_REQUEST,
  VERIFY_RECORDS_SUCCESS,
  VERIFY_RECORDS_FAILURE,
  BLOCK_RECORDS_REQUEST,
  BLOCK_RECORDS_SUCCESS,
  BLOCK_RECORDS_FAILURE,
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

export const verifyResearcher = (id, successCallback, errorCallback) => {
  return dispatch => {
    dispatch(request());
    axios
      .put(`/admin/researchers/${id}`)
      .then(() => {
        dispatch(success());
        successCallback("Researcher verified");
      })
      .catch(err => {
        const errorMessage = getErrorFromResponse(err);
        errorCallback(errorMessage);
        dispatch(failure(errorMessage));
      });
  };
  function request() {
    return { type: VERIFY_RESEARCHER_REQUEST };
  }
  function success() {
    return { type: VERIFY_RESEARCHER_SUCCESS };
  }
  function failure(error) {
    return { type: VERIFY_RESEARCHER_FAILURE, payload: error };
  }
};

export const blockResearcher = (id, successCallback, errorCallback) => {
  return dispatch => {
    dispatch(request());
    axios
      .delete(`/admin/researchers/${id}`)
      .then(() => {
        dispatch(success());
        successCallback("Researcher blocked");
      })
      .catch(err => {
        const errorMessage = getErrorFromResponse(err);
        errorCallback(errorMessage);
        dispatch(failure(errorMessage));
      });
  };
  function request() {
    return { type: BLOCK_RESEARCHER_REQUEST };
  }
  function success() {
    return { type: BLOCK_RESEARCHER_SUCCESS };
  }
  function failure(error) {
    return { type: BLOCK_RESEARCHER_FAILURE, payload: error };
  }
};

export const verifyRecord = (id, successCallback, errorCallback) => {
  return dispatch => {
    dispatch(request());
    axios
      .delete(`/admin/records/${id}`)
      .then(() => {
        dispatch(success());
        successCallback("Record verified");
      })
      .catch(err => {
        const errorMessage = getErrorFromResponse(err);
        errorCallback(errorMessage);
        dispatch(failure(errorMessage));
      });
  };
  function request() {
    return { type: VERIFY_RECORDS_REQUEST };
  }
  function success() {
    return { type: VERIFY_RECORDS_SUCCESS };
  }
  function failure(error) {
    return { type: VERIFY_RECORDS_FAILURE, payload: error };
  }
};

export const blockRecord = (id, successCallback, errorCallback) => {
  return dispatch => {
    dispatch(request());
    axios
      .delete(`/admin/records/${id}`)
      .then(() => {
        dispatch(success());
        successCallback("Record blocked");
      })
      .catch(err => {
        const errorMessage = getErrorFromResponse(err);
        errorCallback(errorMessage);
        dispatch(failure(errorMessage));
      });
  };
  function request() {
    return { type: BLOCK_RECORDS_REQUEST };
  }
  function success() {
    return { type: BLOCK_RECORDS_SUCCESS };
  }
  function failure(error) {
    return { type: BLOCK_RECORDS_FAILURE, payload: error };
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
