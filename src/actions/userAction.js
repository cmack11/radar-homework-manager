import * as types from './action_types.js'

export const initializeUser = () => dispatch => {
 dispatch({
  type: types.INITIALIZE_USER,
  payload: {
    id : 0,
    name: "John Doe",
    email: "example@mail.com"
    /* needs api here */
  }
 })
}

export const resetUser = () => dispatch => {
 dispatch({
  type: types.RESET_USER
 })
}
