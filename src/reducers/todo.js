import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  FETCH_TODOS
} from "../actions/actionsTypes"

let initialState = [];
export default(state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          title: action.payload,
          completed: false,
        },
        ...state
      ];
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.payload.id);
    case TOGGLE_TODO:
      return state.map(todo => 
        todo.id === action.payload ? {...todo, completed: !todo.completed} : todo
      )
    case FETCH_TODOS:
      return [...action.payload.data]
    default:
      return state;
  }
};

