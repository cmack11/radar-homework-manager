import * as types from '../actions/action_types.js';


let initialState = {
  subjects : []
}
export default (state = initialState, action) => {
  console.log(state);
  let newSubjects
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
      return {
        ...state,
        subjects:action.payload.subjects,
      };
    case types.ADD_SUBJECT :
      return {
        ...state,
        subjects : action.payload.subjects
      };

  default:
   return state
 }
}
