import * as types from '../actions/action_types.js'
let initialState = {
  id: -1,
  name: "",
  email: "",
  password: "",
  /* add sign up date if needed*/
}
export default (state = initialState, action) => {
 switch (action.type) {
  case types.INITIALIZE_USER:
   return {
    ...state,
    id: action.payload.id,
    name : action.payload.name,
    email: action.payload.email,
   }

   /**
   *
   * payload : {
   *    id: ....,
        name: ...
        email: ...
   *  }
   *
   **/
   case types.LOGIN_USER :
     return {
      ...state,
      id: action.payload.id,
      name : action.payload.name,
      email: action.payload.email,
     }
   case types.RESET_USER:
    return initialState
  default:
   return state
 }
}
