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
          alert(errorMessages.RETRIEVE_NAME_FAILED)
        }
        else {
          dispatch(initializeName(response.data))
        }
    })
    .catch(error => {
      alert(errorMessages.RETRIEVE_NAME_SERVER_ERROR)
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
          alert(errorMessages.SIGNUP_FAILED)
        }
        else {
          success()
          alert(errorMessages.SIGNUP_SUCCESS)
          dispatch(registerUser())
        }
    })
    .catch(error => {
      alert(errorMessages.SIGNUP_SERVER_ERROR)
    })
  }
}

export const retrieveTasks = (data) => {
  return (dispatch) => {
    return axios.get(API_URL + '/Subjects/getAll/2')
    .then( response => {
        if (response.data === "failed")
        {
          alert(errorMessages.RETRIEVE_TASK_FAILED)
        }
        else {
          console.log(response.data)
        }
    })
    .catch(error => {
      alert(errorMessages.RETRIEVE_TASK_SERVER_ERROR)
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
          /*alert(errorMessages.RESET_PASSWORD_FAILED)*/
        }
        else {
          alert(errorMessages.RESET_PASSWORD_SUCCESS)
          success()
          dispatch(changePassword(email))
        }
    })
    .catch(error => {
      success()
      /*alert(errorMessages.RESET_PASSWORD_SERVER_ERROR)*/
    })
  }
}
