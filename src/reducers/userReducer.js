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
     console.log(action.payload)
     return {
      ...state,
      user_id: action.payload.user_id,
     }
   case types.REGISTER_USER:
    return initialState
   case types.RESET_USER:
    return initialState
  default:
   return state
 }
}
