import * as types from './action_types.js';
import {axios} from 'axios';
import {subjects1} from '../fakeData.js';

export const initializeAssignments = () => {
  return {
    type: types.INITIALIZE_ASSIGNMENTS,
    payload: {
      subjects : subjects1,
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

export const addAssignment = (assignment, subject, type) => {
  /* call api for update */
  return {
    type: types.ADD_ASSIGNMENT,
    payload : {
      subject : subject,
      assignment : assignment,
      task_type : type,
    }
  }
}

export const addSubject = (subject, desc, type) => {
  console.log("abc");
  return {
    type: types.ADD_SUBJECT,
    payload : {
      subject : subject,
      description : desc,
      default_type : type,
    }
  }
}
