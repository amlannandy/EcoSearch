import {
  ADD_RECORD_REQUEST,
  ADD_RECORD_SUCCESS,
  ADD_RECORD_FAILURE,
  GET_RECORD_BY_ID_REQUEST,
  GET_RECORD_BY_ID_SUCCESS,
  GET_RECORD_BY_ID_FAILURE,
  FETCH_ALL_RECORDS_REQUEST,
  FETCH_ALL_RECORDS_SUCCESS,
  FETCH_ALL_RECORDS_FAILURE,
  FETCH_USER_RECORDS_REQUEST,
  FETCH_USER_RECORDS_SUCCESS,
  FETCH_USER_RECORDS_FAILURE,
  DELETE_RECORD_BY_ID_REQUEST,
  DELETE_RECORD_BY_ID_SUCCESS,
  DELETE_RECORD_BY_ID_FAILURE,
} from '../constants/index';

const initialState = {
  records: [],
  record: null,
  recordsActions: {
    isAdding: false,
    isDeleting: false,
    isFetching: false,
    error: null,
    message: null,
  },
};

const records = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ALL_RECORDS_REQUEST:
    case FETCH_USER_RECORDS_REQUEST:
      return {
        ...state,
        recordsActions: {
          ...state.recordsActions,
          isFetching: true,
        },
      };
    case FETCH_ALL_RECORDS_SUCCESS:
    case FETCH_USER_RECORDS_SUCCESS:
      return {
        ...state,
        records: payload,
        recordsActions: {
          ...state.recordsActions,
          isFetching: false,
        },
      };
    case FETCH_ALL_RECORDS_FAILURE:
    case FETCH_USER_RECORDS_FAILURE:
      return {
        ...state,
        recordsActions: {
          ...state.recordsActions,
          isFetching: false,
          error: payload,
        },
      };
    case ADD_RECORD_REQUEST:
      return {
        ...state,
        recordsActions: {
          ...state.recordsActions,
          isAdding: true,
        },
      };
    case ADD_RECORD_SUCCESS:
      return {
        ...state,
        recordsActions: {
          ...state.recordsActions,
          isAdding: false,
        },
      };
    case ADD_RECORD_FAILURE:
      return {
        ...state,
        recordsActions: {
          ...state.recordsActions,
          isAdding: false,
          error: payload,
        },
      };
    case GET_RECORD_BY_ID_REQUEST:
      return {
        ...state,
        recordsActions: {
          ...state.recordsActions,
          isFetching: true,
        },
      };
    case GET_RECORD_BY_ID_SUCCESS:
      return {
        ...state,
        record: payload,
        recordsActions: {
          ...state.recordsActions,
          isFetching: false,
        },
      };
    case GET_RECORD_BY_ID_FAILURE:
      return {
        ...state,
        recordsActions: {
          ...state.recordsActions,
          error: payload,
          isFetching: false,
        },
      };
    case DELETE_RECORD_BY_ID_REQUEST:
      return {
        ...state,
        recordsActions: {
          ...state.recordsActions,
          isDeleting: true,
        },
      };
    case DELETE_RECORD_BY_ID_SUCCESS:
      return {
        ...state,
        record: null,
        recordsActions: {
          ...state.recordsActions,
          isDeleting: false,
        },
      };
    case DELETE_RECORD_BY_ID_FAILURE:
      return {
        ...state,
        recordsActions: {
          ...state.recordsActions,
          error: payload,
          isDeleting: false,
        },
      };
    default:
      return state;
  }
};

export default records;
