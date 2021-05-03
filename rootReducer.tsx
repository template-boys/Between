import { combineReducers } from "redux";
import searchReducer from "./tsx/features/Search/redux/searchReducer";
import loginReducer, {
  LoginReducer,
} from "./tsx/features/Login/redux/loginReducer";
import { SearchReducer } from "./tsx/features/Search/redux/searchReducerTypes";

export interface State {
  loginReducer: LoginReducer;
  searchReducer: SearchReducer;
}

export default combineReducers<State>({
  loginReducer: loginReducer,
  searchReducer: searchReducer,
});
