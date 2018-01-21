import { request } from "../utils/request";

import {
  GET_TODO,
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_DONE_TODO,
} from "../constants/actionTypes";

export const addTodo = todo => {
  return dispatch => {
    return request().post("/todos", todo)
    .then(res => {
      dispatch({
        type: ADD_TODO,
        payload: res.data,
      });
    });
  };
};

export const getTodos = () => {
  return dispatch => {
    return request().get("/todos")
    .then(res => {
      dispatch({
        type: GET_TODO,
        payload: res.data,
      });
    });
  };
};

export const deleteTodos = arId => {
  return dispatch => {
    return request().delete("/todos", { data: arId })
    .then(res => {
      if (res) {
        dispatch({
          type: DELETE_TODO,
          payload: arId,
        });
      }
    });
  };
};

export const checkedTodo = id => dispatch => {
  return request().put("/todos/done", { id })
  .then(res => {
    if (res) {
      dispatch({
        type: TOGGLE_DONE_TODO,
        payload: id,
      });
    }
  });
};

// export const deleteTodos = todosId => dispatch => {
//   return request().delete("/todos")
// };
