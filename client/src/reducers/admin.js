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
    case VERIFY_RECORDS_REQUEST:
    case BLOCK_RECORDS_REQUEST:
    case GET_RESEARCHERS_REQUEST:
    case GET_ADMIN_RECORDS_REQUEST:
    case VERIFY_RESEARCHER_REQUEST:
    case BLOCK_RESEARCHER_REQUEST:
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
    case VERIFY_RECORDS_SUCCESS:
    case BLOCK_RECORDS_SUCCESS:
    case VERIFY_RESEARCHER_SUCCESS:
    case BLOCK_RESEARCHER_SUCCESS:
      return {
        ...state,
        adminActions: {
          ...state.adminActions,
          isLoading: false,
        },
      };
    case VERIFY_RECORDS_FAILURE:
    case BLOCK_RECORDS_FAILURE:
    case GET_RESEARCHERS_FAILURE:
    case GET_ADMIN_RECORDS_FAILURE:
    case VERIFY_RESEARCHER_FAILURE:
    case BLOCK_RESEARCHER_FAILURE:
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
