import axios from "../utils/axios";
import {
  GET_DIVERSITY_REQUEST,
  GET_DIVERSITY_SUCCESS,
  GET_DIVERSITY_FAILURE,
  GET_OBJECT_PATH_REQUEST,
  GET_OBJECT_PATH_SUCCESS,
  GET_OBJECT_PATH_FAILURE,
} from "../constants/index";

export const getDiversity = () => {
  return dispatch => {
    dispatch(request());
    axios
      .post("/stats/species-radius")
      .then(res => {
        dispatch(success(res.data.data));
      })
      .catch(err => {
        const errorMessage = getErrorFromResponse(err);
        dispatch(failure(errorMessage));
      });
  };
  function request() {
    return { type: GET_DIVERSITY_REQUEST };
  }
  function success(data) {
    return { type: GET_DIVERSITY_SUCCESS, payload: data };
  }
  function failure(error) {
    return { type: GET_DIVERSITY_FAILURE, payload: error };
  }
};

export const getObjectPath = label => {
  return dispatch => {
    dispatch(request());
    axios
      .post("/stats/object-path", { label })
      .then(res => {
        dispatch(success(res.data.data));
      })
      .catch(err => {
        const errorMessage = getErrorFromResponse(err);
        dispatch(failure(errorMessage));
      });
  };
  function request() {
    return { type: GET_OBJECT_PATH_REQUEST };
  }
  function success(data) {
    return { type: GET_OBJECT_PATH_SUCCESS, payload: data };
  }
  function failure(error) {
    return { type: GET_OBJECT_PATH_FAILURE, payload: error };
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
