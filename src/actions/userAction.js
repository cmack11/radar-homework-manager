import * as types from './action_types.js'
import * as errorMessages from '../ErrorMessages/error_messages.js';
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
      if (response.data === "failed") {
        alert(errorMessages.LOGIN_FAILED)
      }
      else {
        dispatch(authenticateUser(response.data))
        success()
      }
    })
    .catch(error => {
      /* success() */ /* use this and comment the alert to bypass login */
      alert(errorMessages.LOGIN_SERVER_ERROR)
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
        if (response.data === "failed")
        {
          alert("Failed to register new user")
        }
        else {
          dispatch(registerUser())
          success()
          alert("You are signed up!")
        }
    })
    .catch(error => {
      alert("Can't register new user at this time. If the error persists, contact administrator")
    })
  }
}

export const retrieveTasks = (data) => {
  return (dispatch) => {
    return axios.get(API_URL + '/Subjects/getAll/2')
    .then( response => {
        if (response.data === "failed")
        {
          alert("Failed to retrieve name")
        }
        else {
          console.log(response.data)
        }
    })
    .catch(error => {
      alert("Failed to retrieve name. If this error persists, contact and administrator")
    })
  }
}

export const changePassword = () => dispatch => {
 dispatch({
  type: types.RESET_USER
 })
}

export const resetPassword = (email, success) => {
  return (dispatch) => {
    return axios.get(API_URL + 'api here')
    .then( response => {
        if (response.data === "failed")
        {
          success()
          /*alert("Failed to reset password")*/
        }
        else {
          alert("Password reset success! Please login using the new access")
          success()
          dispatch(changePassword(email))
        }
    })
    .catch(error => {
      alert("Failed to reset name. If this error persists, contact and administrator")
    })
  }
}
