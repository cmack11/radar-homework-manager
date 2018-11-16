import * as types from './action_types.js';
import axios from 'axios';
import {subjects} from '../fakeData.js';
import {API_URL} from '../config/config';

export const initializeAssignments = (data) => {
  return {
    type: types.INITIALIZE_ASSIGNMENTS,
    payload: {
      subjects : data,
      /* needs api here */
    }
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

/*export const retrieveAssignments = (data) => {
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
  }*/



export const updateAssignment = (data) => {
    return {
      type : types.UPDATE_ASSIGNMENT,
      payload: data
    }
}


export const editAssignment = (assignment, subject, desc, due) => {
  let dict = {
    assignment : assignment,
    subject : subject,
    desc : desc,
    dueDate : due
  }
  return (dispatch) => {
    return axios.post(API_URL,dict)
    .then( response => {
      dispatch(updateAssignment(response.data))
    })
    .catch(error => {
      alert("Fail to create new assignment")
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

export const newAssignment = (data) => {
  return (dispatch) => {
    return axios.post(API_URL,data)
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
      subject : data,
    }
  }
}

export const newSubject = (data) => {
  return (dispatch) => {
    return axios.post(API_URL, data)
    .then( response => {
      dispatch(addSubject(response.data))
    })
    .catch(error => {
      alert("Fail to create new subject")
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
export const deleteAssignment = (data) => {
  return {
    type: types.DELETE_SUBJECT,
    payload : {
      subjects : data,
    }
  }
}

export const removeAssignment = (assignment_id) => {
  return (dispatch) => {
    return axios.post(API_URL + '/Tasks/deleteTask/' + assignment_id)
    .then( response => {
      dispatch(deleteAssignment(response.data))
    })
    .catch(error => {
      alert("Fail to create new subject")
    })
  }
}
/* DELETE ASSIGNMENT */

/* COMPLETED_ASSIGNMENT */
export const completedAssignment = (data) => {
  return {
    type: types.COMPLETED_ASSIGNMENT,
    payload : {
      subjects : data,
    }
  }
}

export const completeAssignment = (assignment, subject)  => {
  let d = {
    assignment : assignment,
    subject : subject
  }
  return (dispatch) => {
    return axios.post(API_URL, d)
    .then( response => {
      dispatch(completedAssignment(response.data))
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
