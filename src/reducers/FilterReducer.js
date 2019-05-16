import {
  SHOW_ALL,
  SET_VISIBILITY_FILTER
} from "../actions/actionsTypes";

const visibilityFilter = (state=SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.payload;
    default:
      return state;
  }
};

export default visibilityFilter;
