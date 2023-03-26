import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import employees from "./employees";
import login from "./login";
// I am Using redux Thunk Here
const MainReducer = combineReducers({
  loginReducer: login,
  employeeReduces: employees,
});

const store = createStore(MainReducer, applyMiddleware(thunk));

export default store;
