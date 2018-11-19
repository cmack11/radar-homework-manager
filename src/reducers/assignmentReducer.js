import * as types from '../actions/action_types.js';


let initialState = {
  subjects : []
}
export default (state = initialState, action) => {
  console.log(state);
  let newSubjects;
 switch (action.type) {
  case types.INITIALIZE_ASSIGNMENTS:
   return {
    ...state,
    subjects : action.payload.subjects
   }
   case types.UPDATE_ASSIGNMENT+'deletemetoaccesslater' :
    return {
      ...state,
      subjects : action.payload.subjects
    }
    case types.ADD_ASSIGNMENT :
      return {
        ...state,
        subjects:action.payload.subjects,
      };
    case types.ADD_SUBJECT :
      return {
        ...state,
        subjects : action.payload.subjects
      };
    case types.COMPLETE_ASSIGNMENT :
        return state;
    case types.SET_COMPLETED_ASSIGNMENTS:
      return {
        ...state,
        completedAssignments: action.payload.assignments
      }
    case types.DELETE_TASK:
      return state;

  default:
   return state
 }
}
