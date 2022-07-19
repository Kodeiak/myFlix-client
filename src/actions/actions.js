// ACTION TYPES
export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const DELETE_USER = "DELETE_USER";
export const SET_USER = "SET_USER";
export const GET_USER_DATA = "GET_USER_DATA";
export const UPDATE_USER = "UPDATE_USER";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";


// ACTION CREATORS (RETURNS ACTION ITSELF)
export function setMovies(value) {
  // action returned is an object
  return {
    type: SET_MOVIES,
    value
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  };
}

export function registerUser(value) {
  return {
    type: REGISTER_USER,
    value
  };
}

export function setUser(value) {
  return {
    type: SET_USER,
    value
  };
}

export function getUserData(value) {
  return {
    type: GET_USER_DATA,
    value
  };
}