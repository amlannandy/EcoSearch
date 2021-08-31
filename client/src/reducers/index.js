import { combineReducers } from 'redux';

import auth from './auth';
import records from './records';

const rootReducer = combineReducers({
  auth,
  records,
});

export default rootReducer;
