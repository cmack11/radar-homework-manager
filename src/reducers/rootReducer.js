//combine all reducer to a single index reducer
import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import userReducer from './userReducer';
import assignmentReducer from './assignmentReducer';

export default combineReducers({
 sample: sampleReducer,
 user : userReducer,
 assignment : assignmentReducer
});
