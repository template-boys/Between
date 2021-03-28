import actionTypes from "./loginActionTypes";

const INITIAL_STATE = {
  loggedIn: false,
  user: null,
};

const loginReducer = (state = INITIAL_STATE, action) => {
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
