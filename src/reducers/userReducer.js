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
    console.log(action.payload)
     return {
      ...state,
      user_id: action.payload[0].user_id,
     }
   case types.INITIALIZE_USERNAME:
     return {
       ...state,
       name: action.payload[0].name,
     }
   case types.INITIALIZE_EMAIL:
      return {
        ...state,
        email : action.payload.email,
      }
   case types.REGISTER_USER:
    return initialState
   case types.RESET_USER:
    return initialState
   case types.UPDATE_NAME:
    return {
      ...state,
      name : action.payload,
    }
  default:
   return state
 }
}
