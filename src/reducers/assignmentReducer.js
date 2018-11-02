import * as types from '../actions/action_types.js';
import {axios} from 'axios';
import {subjects1} from '../fakeData.js';

let initialState = {
  subjects : []
}
export default (state = initialState, action) => {
 switch (action.type) {
  case types.INITIALIZE_ASSIGNMENTS:
   return {
    ...state,
    subjects : action.payload.subjects
   }
   case types.UPDATE_ASSIGNMENT :
    return {
      ...state,
      subjects : action.payload.subjects
    }
    case types.ADD_ASSIGNMENT :
      let newSubjectList = state.subjects.map((el, index)=> {
        if (el.id == action.payload.subject.id) el.assignment.append(action.payload.assignment);
        return el;
      })
    case types.ADD_SUBJECT :
      state.subjects.append(action.payload.subject);

  default:
   return state
 }
}
