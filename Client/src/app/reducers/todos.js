import {
  ADD_TODO,
  GET_TODO,
  DELETE_TODO,
  TOGGLE_DONE_TODO,
} from "../constants/actionTypes";

const initState = [];

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      return [
        ...state,
        action.payload,
      ];
    }
    case GET_TODO: {
      return action.payload;
    }
    case DELETE_TODO: {
      const todos = state.filter(todo => !action.payload.includes(todo.id));
      return todos;
    }
    case TOGGLE_DONE_TODO: {
      const todos = state.map(todo => {
        return {
          ...todo,
          done: todo.id === action.payload ? 1 - todo.done : todo.done,
        };
      });
      return todos;
    }
    default:
      return state;
  }
};
