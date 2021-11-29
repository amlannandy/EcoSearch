import {
  GET_RESEARCHERS_REQUEST,
  GET_RESEARCHERS_SUCCESS,
  GET_RESEARCHERS_FAILURE,
  GET_ADMIN_RECORDS_REQUEST,
  GET_ADMIN_RECORDS_SUCCESS,
  GET_ADMIN_RECORDS_FAILURE,
} from "../constants/index";

const initialState = {
  records: [],
  researchers: [],
  adminActions: {
    error: null,
    message: null,
    isLoading: false,
  },
};

const admin = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_RESEARCHERS_REQUEST:
    case GET_ADMIN_RECORDS_REQUEST:
      return {
        ...state,
        adminActions: {
          ...state.adminActions,
          isLoading: true,
        },
      };
    case GET_RESEARCHERS_SUCCESS:
      return {
        ...state,
        researchers: payload,
        adminActions: {
          ...state.adminActions,
          isLoading: false,
        },
      };
    case GET_ADMIN_RECORDS_SUCCESS:
      return {
        ...state,
        records: payload,
        adminActions: {
          ...state.adminActions,
          isLoading: false,
        },
      };
    case GET_RESEARCHERS_FAILURE:
    case GET_ADMIN_RECORDS_FAILURE:
      return {
        ...state,
        adminActions: {
          ...state.adminActions,
          isLoading: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default admin;
