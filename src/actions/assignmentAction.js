import * as types from './action_types.js';
import {axios} from 'axios';
import {subjects} from '../fakeData.js';

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

export const addAssignment = (assignment, subject) => {
  /* call api for update */
  return {
    type: types.ADD_ASSIGNMENT,
    payload : {
      subject : subject,
      assignment : assignment
    }
  }
}

export const addSubject = (subject) => {
  console.log("abc");
  return {
    type: types.ADD_SUBJECT,
    payload : {
      subject : subject,
    }
  }
}
