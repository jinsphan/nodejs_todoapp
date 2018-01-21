import { combineReducers } from "redux";
import todos from "./todos";
import userActive from "./userActive";

export default combineReducers({
  todos,
  userActive,
});
