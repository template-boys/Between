import { combineReducers } from "redux";
import searchReducer from "./tsx/features/Search/redux/searchReducer";
import loginReducer from "./tsx/features/Login/redux/loginReducer";

export default combineReducers({
  loginReducer: loginReducer,
  searchReducer: searchReducer,
});
