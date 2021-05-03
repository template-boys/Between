import { LoginActionTypes } from "./loginActionTypes";
import { LoginReducer, LoginAction } from "./loginReducerTypes";

const INITIAL_STATE: LoginReducer = {
  loggedIn: false,
  user: null,
};

const loginReducer = (
  state: LoginReducer = INITIAL_STATE,
  action: LoginAction
): LoginReducer => {
  switch (action.type) {
    case LoginActionTypes.LOGIN_USER:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
      };
    case LoginActionTypes.LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default loginReducer;
