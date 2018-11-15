import * as types from './action_types.js'
import {API_URL} from '../config/config';
import axios from 'axios';

/* temporary function when login is not active */
export const initializeUser = () => dispatch => {
 dispatch({
  type: types.INITIALIZE_USER,
  payload: {
    id : 0,
    name: "John Doe",
    email: "example@mail.com"
  }
 })
}

 export const authenticateUser = (data) =>  {
   return {
     type: types.LOGIN_USER,
     payload: data
   }
 }

export const resetUser = () => dispatch => {
 dispatch({
  type: types.RESET_USER
 })
}

export const sendCredentials= (data, success) => {
  return (dispatch) => {
    return axios.post(API_URL + '/RadarUsers/login',data)
    .then( response => {
      console.log(response.data)
      dispatch(authenticateUser(response.data))
      success()
    })
    .catch(error => {
      alert("Login failed")
    })
  }

}
