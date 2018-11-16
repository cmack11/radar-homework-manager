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
      if (response.data === "failed") {
        alert("Login failed")
      }
      else {
        dispatch(authenticateUser(response.data))
        success()
      }
    })
    .catch(error => {
      alert("Login server error. If this problem persists, contact admisnistrator")
    })
  }

}

export const registerUser = () => dispatch => {
 dispatch({
  type: types.REGISTER_USER
 })
}

export const newUser = (data, success) => {
  return (dispatch) => {
    return axios.post(API_URL + '/RadarUsers/register',data)
    .then( response => {
        dispatch(registerUser())
        success()
        alert("You are signed up!")
    })
    .catch(error => {
      alert("Failed to register new user")
    })
  }
}
