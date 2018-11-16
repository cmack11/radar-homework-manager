import * as types from './action_types.js'
import {API_URL} from '../config/config';
import axios from 'axios';

/* temporary function when login is not active */
export const initializeUser = () => dispatch => {
 dispatch({
  type: types.INITIALIZE_USER,
  payload: {
    id : -1,
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
      console.log("Successfully logged in with id " + JSON.stringify(response.data))

      if (response.data === "failed") {
        alert("Login failed")
      }
      else {
        dispatch(authenticateUser(response.data))
        success()
      }
    })
    .catch(error => {
      /* success() */ /* use this and comment the alert to bypass login */
      alert("Login server error. If this problem persists, contact admisnistrator")
    })
  }

}

export const initializeName = (data) =>  {
  return {
    type: types.INITIALIZE_USERNAME,
    payload: data
  }
}

export const retrieveName = (id) => {
  console.log("Retrived name called " + id)
  return (dispatch) => {
    return axios.get(API_URL + '/RadarUsers/getName/' +id)
    .then( response => {
        console.log("Retrieved data is")
        if (response.data === "failed")
        {
          alert("Failed to retrieve name")
        }
        else {
          dispatch(initializeName(response.data))
        }
    })
    .catch(error => {
      alert("Failed to retrieve name. If this error persists, contact and administrator")
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
