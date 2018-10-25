import * as types from '../actions/action_types.js'
let initialState = {
  id: 0,
  name: "",
  email: "",
  /* add sign up date if needed*/
}
export default (state = initialState, action) => {
 switch (action.type) {
  case types.INITIALIZE_USER:
   return {
    ...state,
    id: action.payload.id,
    name : action.payload.name,
    email: action.payload.email
   }
   case types.RESET_USER:
    return initialState
  default:
   return state
 }
}
