/**
 * @file
 * Constants for Action types
 * Used in actions and reducers. Fill as needed
 *
 */

/* SYSTEM ERROR MESSAGES */

/* USER ACTIONS */
/* src/actions/userAction.js */
export const LOGIN_FAILED = 'Login failed'
export const LOGIN_SERVER_ERROR = 'Login server error. If this problem persists, contact admisnistrator'
export const RETRIEVE_NAME_FAILED = 'Failed to retrieve name'
export const RETRIEVE_NAME_SERVER_ERROR =   'Failed to retrieve name. If this error persists, contact administrator'
export const SIGNUP_SUCCESS = 'You are signed up!'
export const SIGNUP_FAILED = 'Failed to register new user'
export const SIGNUP_SERVER_ERROR = "Can't register new user at this time. If the error persists, contact administrator"
export const RETRIEVE_TASK_FAILED = "Failed to retrieve tasks"
export const RETRIEVE_TASK_SERVER_ERROR = "Failed to retrieve tasks. If this error persists, contact and administrator"
export const RESET_PASSWORD_SUCCESS = "Password reset success! Please login using the new access code"
export const RESET_PASSWORD_FAILED = "Failed to reset password"
export const RESET_PASSWORD_SERVER_ERROR = "Failed to reset password. If this error persists, contact and administrator"
export const RETRIEVE_EMAIL_FAILED = "Failed to retrieve email"
export const RETRIEVE_EMAIL_SERVER_ERROR = "Failed to retrieve email. If this error persists, contact and administrator"

/* ASSIGNMENT ACTIONS */
/* src/actions/assignmentAction.js */
export const RETRIEVE_OVERDUE_FAILED = "Failed to retrieve overdue assignments"
export const RETRIEVE_OVERDUE_SERVER_ERROR = "Failed to retrieve overdue assignments. If this error persists, contact and administrator"
export const RETRIEVE_COMPLETED_FAILED = "Failed to retrieve completed assignments"
export const RETRIEVE_COMPLETED_SERVER_ERROR = "Failed to retrieve completed assignments. If this error persists, contact and administrator"
export const RETRIEVE_TYPES_FAILED = "Failed to retrieve assignment types"
export const RETRIEVE_TYPES_SERVER_ERROR = "Failed to retrieve assignment types. If this error persists, contact and administrator"
export const ADD_SUBJECT_FAILED = "Fail to add suject"
export const ADD_SUBJECT_SERVER_ERROR = "Failed to add subject. If this error persists, contact and administrator"
export const EDIT_SUBJECT_SERVER_ERROR = "Failed to edit subject. If this error persists, contact and administrator"
export const DELETE_SUBJECT_SERVER_ERROR = "Failed to delete subject. If this error persists, contact and administrator"
export const ADD_TASK_SERVER_ERROR = "Failed to add assignment. If this error persists, contact and administrator"
export const EDIT_TASK_SERVER_ERROR = "Failed to edit assignment. If this error persists, contact and administrator"
export const DELETE_TASK_SERVER_ERROR = "Failed to delete assignment. If this error persists, contact and administrator"
export const COMPLETE_TASK_SERVER_ERROR = "Failed to complete assignments. If this error persists, contact and administrator"
export const ADD_TYPE_SERVER_ERROR = "Failed to add assignment type. If this error persists, contact and administrator"
export const EDIT_TYPE_SERVER_ERROR = "Failed to edit assignment type. If this error persists, contact and administrator"
export const DELETE_TYPE_SERVER_ERROR = "Failed to delete assignment type. If this error persists, contact and administrator"
