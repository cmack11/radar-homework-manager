//combine all reducer to a single index reducer
import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import userReducer from './userReducer';

export default combineReducers({
 sample: sampleReducer,
 user : userReducer
});
