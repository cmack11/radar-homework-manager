import * as types from '../actions/action_types.js'
let initialState = {
  user_id: -1,
  name: "",
  email: "",
  /* add sign up date if needed*/
}
export default (state = initialState, action) => {
 switch (action.type) {
  case types.INITIALIZE_USER:
   return {
    ...state,
    user_id: action.payload.id,
    name : action.payload.name,
    email: action.payload.email,
   }

   /**
   *
   * payload : {
   *    id: ....,
   *  }
   *
   **/
   case types.LOGIN_USER:
    console.log("Before retreived login " + JSON.stringify(action.payload[0]))
     return {
      ...state,
      user_id: action.payload[0].User_id,
     }
   case types.INITIALIZE_USERNAME:
     return {
       ...state,
       name: action.payload[0].Name,
     }
   case types.REGISTER_USER:
    return initialState
   case types.RESET_USER:
    return initialState
  default:
   return state
 }
}
