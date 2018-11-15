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

/* retrieve assignment should call initialize assignment */
export const retrieveAssignments = (data) => {
  return (dispatch) => {
    return axios.get(API_URL)
    .then( response => {
      dispatch(updateAssignment(response.data))
    })
    .catch(error => {
        alert("Failed to retrieve assignments")
    })
  }
}

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

export const newAssignment = (assignment, subject) => {
  let dict = {
    assignment : assignment,
    subject : subject
  }
  return (dispatch) => {
    return axios.post(API_URL,dict)
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

export const newSubject = (subject) => {
  return (dispatch) => {
    return axios.post(API_URL, subject)
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

/* DELETE ASSIGNMENT */
export const deleteAssignment = (data) => {
  return {
    type: types.DELETE_SUBJECT,
    payload : {
      subjects : data,
    }
  }
}

export const removeAssignment = (assignment, subject) => {
  let d = {
    assignment : assignment,
    subject : subject
  }
  return (dispatch) => {
    return axios.post(API_URL, d)
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
