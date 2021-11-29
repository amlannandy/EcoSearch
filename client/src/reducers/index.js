import { combineReducers } from "redux";

import auth from "./auth";
import admin from "./admin";
import records from "./records";

const rootReducer = combineReducers({
  auth,
  admin,
  records,
});

export default rootReducer;
