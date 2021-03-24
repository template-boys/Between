import actionTypes from "./loginActionTypes";

export const loginUser = (user: any) => ({
  type: actionTypes.LOGIN_USER,
  payload: user,
});

export const logoutUser = () => ({
  type: actionTypes.LOGOUT_USER,
});
