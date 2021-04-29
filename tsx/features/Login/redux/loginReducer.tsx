import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import actionTypes from "./loginActionTypes";

const INITIAL_STATE: LoginReducer = {
  loggedIn: false,
  user: null,
};

export interface LoginReducer {
  loggedIn: boolean,
  user: FirebaseAuthTypes.User | null,
}

const loginReducer = (state: LoginReducer = INITIAL_STATE, action): LoginReducer => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
      };
    case actionTypes.LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default loginReducer;
