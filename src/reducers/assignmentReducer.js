import * as types from '../actions/action_types.js';
import {axios} from 'axios';
import {subjects1} from '../fakeData.js';

let initialState = {
  subjects : []
}
export default (state = initialState, action) => {
  console.log(state);
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
      let newSubjects = state.subjects.slice();
      newSubjects.map((el, index)=> {
        if (el.name === action.payload.subject){
          el.assignments.push(action.payload.assignment)
        } 
      });
      return {
        ...state,
        subjects:newSubjects
      };
    case types.ADD_SUBJECT :
      let newSubjs = state.subjects.slice();
      newSubjs.push(action.payload.subject);
      return {
        ...state,
        subjects:newSubjs
      };

  default:
   return state
 }
}
