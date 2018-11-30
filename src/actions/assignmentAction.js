import * as types from './action_types.js';
import { connect } from 'react-redux'
import axios from 'axios';
import {subjects, typesExample} from '../fakeData.js';
import {API_URL, DATE_FORMAT} from '../config/config';
import moment from 'moment'
import * as errorMessages from '../ErrorMessages/error_messages.js'



/**
 *  RETRIEVAL API CALLS
 */
 export const retrieveTasks = (user_id) => {
  let params = {
    user_id:user_id,
    current_time:moment().format(DATE_FORMAT)
  }
   return (dispatch) => {
     return axios.post(API_URL + '/Tasks/getIncomplete/', params)
     .then( response => {
         if (response.data === "failed")
         {
           alert(errorMessages.RETRIEVE_TASK_FAILED)
         }
         else {
           console.log(response.data)
           response.data.map((subj) =>{
            subj.assignments.map((task)=> {
              console.log(task)
             if(!task.type_id) task.type_id = task.type;
            })
           })
           dispatch(initializeTasks(response.data))
         }
     })
     .catch(error => {
       alert(errorMessages.RETRIEVE_TASK_SERVER_ERROR)
     })
   }
 }

 export const retrieveOverdueTasks = (user_id) => {
  let params = {
    user_id:user_id,
    current_time:moment().format(DATE_FORMAT)
  }

   return (dispatch) => {
     return axios.post(API_URL + '/Tasks/getOverdue/',params)
     .then( response => {
         if (response.data === "failed") {
           alert(errorMessages.RETRIEVE_OVERDUE_FAILED)
         }
         else {
           //console.log(response.data)
           dispatch(setOverdueTasks(response.data))
         }
     })
     .catch(error => {
       alert(errorMessages.RETRIEVE_OVERDUE_SERVER_ERROR)
     })
   }
 }

 export const retrieveCompletedTasks = (user_id) => {
  let params = {user_id:user_id}
   return (dispatch) => {
     return axios.post(API_URL + '/Tasks/getComplete/',params)
     .then( response => {
         if (response.data === "failed") {
           alert(errorMessages.RETRIEVE_COMPLETED_FAILED)
         }
         else {
           //console.log(response.data)
           dispatch(setCompletedTasks(response.data))
         }
     })
     .catch(error => {
       alert(errorMessages.RETRIEVE_COMPLETED_SERVER_ERROR)
     })
   }
 }

 export const retrieveTypes = (user_id) => {
    let params = {user_id:user_id}
   return (dispatch) => {
     return axios.post(API_URL + '/Types/getTypes/',params)
     .then( response => {
         //console.log(response.data)
         dispatch(setTypes(response.data))
     })
     .catch(error => {
        //console.log(error)
        alert(errorMessages.RETRIEVE_TYPES_SERVER_ERROR)
     })
   }
 }



 /**
  *  SUBJECT API CALLS
  */


 export const newSubject = (name, color, description, default_type_id, user_id) => {
   let params = {
     name:name,
     color:color,
     description:description,
     primary_type:default_type_id,
     user_id : user_id,
   }

   return (dispatch) => {
     return axios.post(API_URL + '/Subjects/addSubject',params)
     .then( response => {
       if (response.data === "failed") {
         alert(errorMessages.ADD_SUBJECT_FAILED)
       }
       else {
         let newSubject = response.data;
         //console.log('NEW SUBJECT')
         //console.log(newSubject)
         if(newSubject)
          dispatch(addSubject(newSubject))
       }
     })
     .catch(error => {

       alert(errorMessages.ADD_SUBJECT_SERVER_ERROR)
     })
   }
 }

 export const editSubject = (newSubject, user_id) => {
   let params = {
     user_id:user_id,
     subject_id:newSubject.subject_id,
     name:newSubject.name,
     color:newSubject.color,
     description:newSubject.description,
     primary_type:parseInt(newSubject.primary_type)
   };
   console.log(params)
   return (dispatch) => {
     return axios.post(API_URL+'/Subjects/updateSubject/', params)
     .then( response => {
       let newS = response.data;
       console.log(response)
       if(newS)
        dispatch(updateSubject(newS))
     })
     .catch(error => {
       alert(errorMessages.EDIT_SUBJECT_SERVER_ERROR)
     })
   }
 }

 export const deleteSubject = (subject,user_id) => {
   let params = {
    user_id:user_id,
    subject_id:subject.subject_id
  }
   return (dispatch) => {
     return axios.post(API_URL+'/Subjects/deleteSubject/',params)
     .then( response => {

      if(response.status === 200 && response.data !== 'failed')
       dispatch(removeSubject(subject.subject_id))

     })
     .catch(error => {
       alert(errorMessages.DELETE_SUBJECT_SERVER_ERROR)
     })
   }
 }


/**
 *  TASK API CALLS
 */


export const newTask = (name,description,type_id,dueDate, subject_id, user_id) => {
  //console.log('NEW TASK')
  //console.log(type_id)
  type_id = parseInt(type_id);
  let params = {
      name:name,
      description:description,
      type_id:type_id,
      dueDate:dueDate,
      subject_id : subject_id,
      user_id : user_id
  }
  //console.log(params)
  return (dispatch) => {
    return axios.post(API_URL + '/Tasks/addTask',params)
    .then( response => {
      let newTask = response.data;
      //console.log('RESPONSE')
      //console.log(newTask)
      if(newTask && subject_id)
        dispatch(addTask(newTask, subject_id))
    })
    .catch(error => {
      alert(errorMessages.ADD_TASK_SERVER_ERROR)
    })
  }
}

export const editTask = (task, subject_id, user_id) => {
  let params = {
    name:task.name,
    description:task.description,
    type_id:task.type_id,
    dueDate:task.dueDate,
    task_id:task.task_id,
    subject_id:subject_id,
    user_id:user_id,
  }
  return (dispatch) => {
    return axios.post(API_URL + '/Tasks/updateTask',params)
    .then( response => {
      console.log(response)
      dispatch(updateTask(response.data))
    })
    .catch(error => {
      alert(errorMessages.EDIT_TASK_SERVER_ERROR)
    })
  }
}

export const deleteTask = (task,user_id) => {
  let params = {
    user_id:user_id,
    subject_id:task.subject_id,
    task_id:task.task_id
  }

  return (dispatch) => {
    return axios.post(API_URL + '/Tasks/deleteTask/',params)
    .then( response => {
      if(response.status === 200 && response.data !== 'failed')
        dispatch(removeTask(task.task_id,null,'SUBJECTS'))
    })
    .catch(error => {
      alert(errorMessages.DELETE_TASK_SERVER_ERROR)
    })
  }
}

export const completeTask = (task,user_id)  => {
  //console.log('COMPLETE');
  let params = {
    task_id:task.task_id,
    subject_id:task.subject_id,
    user_id:user_id
  }
  return (dispatch) => {
    return axios.post(API_URL+'/Tasks/completeTask', params)
    .then( response => {
      //console.log(response)
      if(response.status === 200 && response.data !== 'failed') {
        dispatch(removeTask(task.task_id,null,'OVERDUE'))//remove from overdue collection
      }
    })
    .catch(error => {
      alert(errorMessages.COMPLETE_TASK_SERVER_ERROR);
    })
  }
}


/**
 *  TYPE API CALLS
 */

 export const newType = (user_id, name, color) => {
  let params = {
    user_id:user_id,
    name:name,
    color:color
  }
  //console.log('ADD TYPE')
  //console.log(params)
   return (dispatch) => {
     return axios.post(API_URL + '/Types/addType/', params)
     .then( response => {
        //console.log(response)
         dispatch(addType(response.data))
     })
     .catch(error => {
        params.type_id = 100;
        dispatch(addType(params))//Remove when working
       //alert(errorMessages.ADD_TYPE_SERVER_ERROR)
     })
   }
 }

 export const editType = (user_id, type_id, name, color) => {
  let params = {
    user_id:user_id,
    type_id:type_id,
    name:name,
    color:color
  }
   return (dispatch) => {
     return axios.post(API_URL + '/Types/updateType/', params)
     .then( response => {
        let newType = response.data;
        //console.log(newType)
        if(newType && response.status === 200)
         dispatch(updateType(newType))
     })
     .catch(error => {
        //console.log(error)
        alert(errorMessages.EDIT_TYPE_SERVER_ERROR)
     })
   }
 }

 export const deleteType = (type_id, user_id) => {
  let params = {
    type_id:type_id,
    user_id:user_id
  }
   return (dispatch) => {
     return axios.post(API_URL + '/Types/deleteType/',params)
     .then( response => {
         dispatch(removeType(params.type_id))
     })
     .catch(error => {
        alert(errorMessages.DELETE_TYPE_SERVER_ERROR)
     })
   }
 }



/**
 *  ACTIONS THAT MODIFY STATE
 */



/*Retrival actions*/
export const initializeTasks = (data) => {
  return {
    type: types.INITIALIZE_ASSIGNMENTS,
    payload: {
      subjects : data,
    }
  }
}

export const setOverdueTasks = (assignments) => {
  return {
    type: types.SET_OVERDUE_ASSIGNMENTS,
    payload: {
      assignments : assignments,
    }
  }
}

export const setCompletedTasks = (assignments) => {
  return {
    type: types.SET_COMPLETED_ASSIGNMENTS,
    payload: {
      assignments : assignments,
    }
  }
}
/*Retrival actions*/

/*Subject actions*/
export const updateSubject = (subject) => {
  return {
    type: types.UPDATE_SUBJECT,
    payload : {
      subject : subject,
    }
  }
}

export const removeSubject = (subject_id) => {
  return {
    type: types.DELETE_SUBJECT,
    payload : {
      subject_id : subject_id,
    }
  }
}

export const addSubject = (subject) => {
  return {
    type: types.ADD_SUBJECT,
    payload : {
      subject : subject,
    }
  }
}
/*Subject actions*/

/*Task actions*/
export const addTask = (assignment, subject_id) => {
  return {
    type: types.ADD_ASSIGNMENT,
    payload : {
      assignment : assignment,
      subject_id: subject_id
    }
  }
}

export const updateTask = (assignment) => {
    return {
      type : types.UPDATE_ASSIGNMENT,
      assignment: assignment
    }
}

export const removeTask = (task_id, subject_id,collection) => {
  return {
    type: types.DELETE_TASK,
    payload : {
      task_id:task_id,
      subject_id:subject_id,
      collection:collection
    }
  }
}
/*Task actions*/

/*Type actions*/
export const setTypes = (typesArray) => {
  return {
    type: types.SET_TYPES,
    payload: {
      types : typesArray,
    }
  }
}

export const addType = (type) => {
  return {
    type: types.ADD_TYPE,
    payload: {
      type : type,
    }
  }
}

export const updateType = (type) => {
  return {
    type: types.UPDATE_TYPE,
    payload: {
      type : type,
    }
  }
}

export const removeType = (type_id) => {
  return {
    type: types.REMOVE_TYPE,
    payload: {
      type_id : type_id,
    }
  }
}
/*Type actions*/
