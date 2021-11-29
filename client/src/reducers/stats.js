import {
  GET_DIVERSITY_REQUEST,
  GET_DIVERSITY_SUCCESS,
  GET_DIVERSITY_FAILURE,
  GET_OBJECT_PATH_REQUEST,
  GET_OBJECT_PATH_SUCCESS,
  GET_OBJECT_PATH_FAILURE,
} from "../constants/index";

const initialState = {
  stats: [],
  objectPath: [],
  statsActions: {
    error: null,
    message: null,
    isLoading: false,
  },
};

const admin = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DIVERSITY_REQUEST:
    case GET_OBJECT_PATH_REQUEST:
      return {
        ...state,
        statsActions: {
          ...state.statsActions,
          isLoading: true,
        },
      };
    case GET_DIVERSITY_SUCCESS:
      return {
        ...state,
        stats: payload,
        statsActions: {
          ...state.statsActions,
          isLoading: false,
        },
      };
    case GET_OBJECT_PATH_SUCCESS:
      return {
        ...state,
        objectPath: payload,
        statsActions: {
          ...state.statsActions,
          isLoading: false,
        },
      };
    case GET_DIVERSITY_FAILURE:
    case GET_OBJECT_PATH_FAILURE:
      return {
        ...state,
        statsActions: {
          ...state.statsActions,
          isLoading: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default admin;
