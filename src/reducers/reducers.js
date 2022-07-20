// REDUCERS > HOW STATE SHOULD BE CHANGED
import { combineReducers } from "redux";
import { SET_FILTER, SET_MOVIES, SET_USER, GET_USER_DATA, SET_FAVORITES } from "../actions/actions";

// reducer visibilityFilter, updates the state with action...
// state = "" is a default parameter, which allows state to be initialized even if no value or undefined state is passed
function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default: // setting a default state is essential to avoid an undefined state
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function user(state = "", action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

function userData(state = [], action) {
  switch (action.type) {
    case GET_USER_DATA:
      return action.value;
    default:
      return state;
  }
}

function favorites(state = [], action) {
  switch (action.type) {
    case SET_FAVORITES:
      return action.value;
    default:
      return state;
  }
}


// Combined reducer (reducer consisting of other reducers) which separates concerns
const moviesApp = combineReducers({
  visibilityFilter,
  favorites,
  movies,
  user,
  userData
});

export default moviesApp;
