import {
  FETCH_ALL_RECORDS_REQUEST,
  FETCH_ALL_RECORDS_SUCCESS,
  FETCH_ALL_RECORDS_FAILURE,
} from '../constants/index';

const initialState = {
  records: [],
  recordsActions: {
    isFetching: false,
    error: null,
    message: null,
  },
};

const records = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ALL_RECORDS_REQUEST:
      return {
        ...state,
        recordsActions: {
          ...state.recordsActions,
          isFetching: true,
        },
      };
    case FETCH_ALL_RECORDS_SUCCESS:
      return {
        ...state,
        records: payload,
        recordsActions: {
          ...state.recordsActions,
          isFetching: false,
        },
      };
    case FETCH_ALL_RECORDS_FAILURE:
      return {
        ...state,
        recordsActions: {
          ...state.recordsActions,
          isFetching: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default records;
