import * as types from './action_types.js';
import {axios} from 'axios';
import {subjects} from '../fakeData.js';
import {API_URL} from '../config/config';

export const initializeAssignments = () => {
  return {
    type: types.INITIALIZE_ASSIGNMENTS,
    payload: {
      subjects : subjects,
      /* needs api here */
    }
  }


}

export const retrieveAssignments = (data) => {
  /*
  return (dispatch) => {
    return axios.post(url,data)
    .then( response => {
      dispatch(updateAssignments(data))
    })
    .catch(error => {

    })
  }
  */
}

export const updateAssignments = (data) => {
    return {
      type : types.UPDATE_ASSIGNMENT,
      payload: data
    }
}

export const addAssignment = (data) => {
  return {
    type: types.ADD_ASSIGNMENT,
    payload : {
      subjects : data.data
    }
  }
}

export const newAssignment = (assignment, subject) => {
  let dict = {
    assignment : assignment,
    subject : subject
  }
  return (dispatch) => {
    return axios.post(API_URL,dict)
    .then( response => {
      dispatch(updateAssignments(response.data))
    })
    .catch(error => {
      alert("Fail to create new assignment")
    })
  }
}

export const addSubject = (data) => {
  return {
    type: types.ADD_SUBJECT,
    payload : {
      subjects : data,
    }
  }
}

export const newSubject = (subject) => {
  return (dispatch) => {
    return axios.post(API_URL, subject)
    .then( response => {
      dispatch(updateAssignments(response.data))
    })
    .catch(error => {
      alert("Fail to create new subject")
    })
  }
}
