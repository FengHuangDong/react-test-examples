import axios from 'axios';
import { REMOVE_TODO, ADD_TODO, SET_VISIBILITY_FILTER,FETCH_TODOS,ERR_FETCH_TODOS, TOGGLE_TODO } from "./actionsTypes";

export const addToList = (text) => {
  return {
    type: ADD_TODO,
    payload: text
  };
};

export const setVisibilityFilter = (type) => {
  return {
    type:SET_VISIBILITY_FILTER,
    payload:type
  }
}
export const toogleTodo = (id) => {
  return {
    type:TOGGLE_TODO,
    payload:id
  }
}
export const removeFromList = (text) => {
  return {
      type:REMOVE_TODO,
      payload: text
  }
};


export const fetchTodos = () => {
  return async (dispatch) => {
    try {
      let todos = await axios.get(`https://jsonplaceholder.typicode.com/todos`)
      dispatch({
        type: FETCH_TODOS,
        payload: todos
      })
    } catch (err) {
      debugger
      dispatch({
        type: ERR_FETCH_TODOS,
        payload: err
      })
    }
  }
}
