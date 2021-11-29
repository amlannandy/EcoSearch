import { combineReducers } from "redux";

import auth from "./auth";
import admin from "./admin";
import stats from "./stats";
import records from "./records";

const rootReducer = combineReducers({
  auth,
  admin,
  stats,
  records,
});

export default rootReducer;
