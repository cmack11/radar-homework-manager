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
