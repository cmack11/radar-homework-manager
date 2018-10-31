import * as types from './action_types.js';
import {axios} from 'axios';

export const initializeAssignments = () => dispatch => {
 dispatch({
  type: types.INITIALIZE_ASSIGNMENTS,
  payload: {
    name:"",
    color:"",
    assignments:[],
    /* needs api here */
  }
 })
}

export const retrieveAssignments = (data) => {
  return (dispatch) => {
    return axios.post(,data)
    .then( response => {
      dispatch(updateAssignments(data))
    })
    .catch(error => {
      /* fix this */
    })
  }
}

export const updateAssignments = (data) => {
    return {
      type : types.UPDATE_ASSIGNMENT,
      payload: data.data,


    }
}
