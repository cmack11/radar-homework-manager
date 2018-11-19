import * as types from './action_types.js';
import { connect } from 'react-redux'
import axios from 'axios';
import {subjects} from '../fakeData.js';
import {API_URL} from '../config/config';

export const initializeAssignments = (data) => {
  return {
    type: types.INITIALIZE_ASSIGNMENTS,
    payload: {
      subjects : data,
    }
  }
}

export const setCompletedAssignments = (assignments) => {
  return {
    type: types.SET_COMPLETED_ASSIGNMENTS,
    payload: {
      assignments : assignments,
    }
  }
}

export const retrieveCompletedAssignments = (user_id) => {
  let params = {user_id:user_id};

  return (dispatch) => {
    return axios.get(API_URL + '/Tasks/viewCompletedTasks/' + params)
    .then( response => {
      console.log(response)
        if (response.data === "failed") {
          alert("Failed to retrieve completed assignments")
        }
        else {
          dispatch(setCompletedAssignments(response.data))
        }
    })
    .catch(error => {
      alert("Failed to retrieve name. If this error persists, contact and administrator")
    })
  }
}

/* retrieve assignment should call initialize assignment */

export const retrieveAssignments = (data) => {
  return (dispatch) => {
    return axios.get(API_URL + '/Subjects/getAll/' + data)
    .then( response => {
        if (response.data === "failed")
        {
          alert("Failed to retrieve name")
        }
        else {
          dispatch(initializeAssignments(response.data))
        }
    })
    .catch(error => {
      alert("Failed to retrieve name. If this error persists, contact and administrator")
    })
  }
}


export const updateAssignment = (data) => {
    return {
      type : types.UPDATE_ASSIGNMENT,
      payload: data
    }
}


export const editAssignment = (task, subject_id, user_id) => {
  let params = {
    name:task.name,
    description:task.description,
    type:task.type,
    dueDate:task.dueDate,
    task_id:task.task_id,
    subject_id:subject_id,
    user_id:user_id,
  }
  return (dispatch) => {
    return axios.post(API_URL + '/Tasks/updateA',params)
    .then( response => {
      console.log(response)
      dispatch(updateAssignment(response.data))
    })
    .catch(error => {
      alert("Failed to edit assignment")
    })
  }
}

/* ADD ASSIGNMENT */
export const addAssignment = (data) => {
  return {
    type: types.ADD_ASSIGNMENT,
    payload : {
      subjects : data
    }
  }
}

export const newAssignment = (name,description,type,dueDate, subject_id, user_id) => {
  let params = {
      name:name,
      description:description,
      type:type,
      dueDate:dueDate,
      subject_id : subject_id,
      user_id : user_id
  }

  return (dispatch) => {
    return axios.post(API_URL + '/Tasks/addA',params)
    .then( response => {
      dispatch(addAssignment(response.data))
    })
    .catch(error => {
      alert("Fail to create new assignment")
    })
  }
}
/* ADD ASSIGNMENT */

/* ADD SUBJECT */
export const addSubject = (data) => {
  return {
    type: types.ADD_SUBJECT,
    payload : {
      subjects : data,
    }
  }
}

export const newSubject = (name, color, description, primary_type, user_id) => {
  let params = {
    name:name,
    color:color,
    description:description,
    primary_type:primary_type,
    user_id : user_id,
  }
  return (dispatch) => {
    return axios.post(API_URL + '/Subjects/addSubject',params)
    .then( response => {
      if (response.data === "failed") {
        alert("Adding failed")
      }
      else {
        dispatch(addSubject(response.data))
      }
    })
    .catch(error => {
      alert("Server error")
    })
  }
}
/* ADD SUBJECT */

/* DELETE SUBJECT */
export const deleteSubject = (data) => {
  return {
    type: types.DELETE_SUBJECT,
    payload : {
      subjects : data,
    }
  }
}

export const removeSubject = (subject) => {
  return (dispatch) => {
    return axios.post(API_URL, subject)
    .then( response => {
      dispatch(deleteSubject(response.data))
    })
    .catch(error => {
      alert("Fail to create new subject")
    })
  }
}
/* DELETE SUBJECT */

/* EDIT SUBJECT */
export const updateSubject = (data) => {
  return {
    type: types.DELETE_SUBJECT,
    payload : {
      subjects : data,
    }
  }
}

export const editSubject = (data) => {
  return (dispatch) => {
    return axios.post(API_URL, data)
    .then( response => {
      dispatch(deleteSubject(response.data))
    })
    .catch(error => {
      alert("Fail to create new subject at this time. If the persists, contact administrator")
    })
  }
}

/* DELETE ASSIGNMENT */
export const removeTask = (data) => {
  return {
    type: types.DELETE_TASK,
    payload : {
      subjects : data,
    }
  }
}

export const deleteTask = (task) => {
  let params = {task_id:task.task_id}

  return (dispatch) => {
    return axios.post(API_URL + '/Tasks/deleteTask/',params)
    .then( response => {
      dispatch(removeTask(response.data))
    })
    .catch(error => {
      console.log(error)
      alert("Failed to delete task")
    })
  }
}
/* DELETE ASSIGNMENT */

/* COMPLETED_ASSIGNMENT */
export const compAssignment = (id) => {
  return {
    type: types.COMPLETE_ASSIGNMENT,
    payload : {
      task_id : id,
    }
  }
}

export const completeAssignment = (assignment)  => {
  
  let params = {
    task_id:assignment.task_id
  }
  console.log(params)
  return (dispatch) => {
    return axios.post(API_URL+'/Tasks/setCompleted', params)
    .then( response => {
      console.log(response)
      dispatch(compAssignment(assignment.task_id))
    })
    .catch(error => {
      alert("Fail to complete assignment");
    })
  }
}
/* COMPLETED_ASSIGNMENT */

/* OVERDUE ASSIGNMENTS */
export const overdueAssignments = (data) => {
  return {
    type: types.OVERDUE_ASSIGNMENT,
    payload : {
      subjects : data,
    }
  }
}

export const pastAssignments = () => {
  return (dispatch) => {
    return axios.post(API_URL)
    .then( response => {
      dispatch(overdueAssignments(response.data))
    })
    .catch(error => {
      alert("Fail to get past assignments");
    })
  }
}

/* OVERDUE ASSIGNMENTS */
