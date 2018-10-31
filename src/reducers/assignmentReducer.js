import * as types from '../actions/action_types.js';
import {axios} from 'axios';

let initialState = {
  name:"",
  color:"",
  assignments:[]
}
export default (state = initialState, action) => {
 switch (action.type) {
  case types.INITIALIZE_USER:
   return {
    ...state,
    name: action.payload.name,
    color : action.payload.color,
    assignments: action.payload.assignments
   }
   case types.UPDATE_ASSIGNMENT :
    return {
      ...state,
      name: action.payload.name,
      color : action.payload.color,
      assignments: action.payload.assignments
    }
  default:
   return state
 }
}
