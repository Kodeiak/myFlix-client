// REDUCERS > HOW STATE SHOULD BE CHANGED
import { combineReducers } from "redux";
import { SET_MOVIES } from "../actions/actions";

import { SET_FILTER, SET_MOVIES } from "../actions/actions";

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

// Combined reducer (reducer consisting of other reducers) which separates concerns
const moviesApp = combineReducers({
  visibilityFilter,
  movies
});

export default moviesApp;
