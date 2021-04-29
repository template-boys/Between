import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import actionTypes from "./loginActionTypes";

export const loginUser = (user: FirebaseAuthTypes.User | null) => ({
  type: actionTypes.LOGIN_USER,
  payload: user,
});

export const logoutUser = () => ({
  type: actionTypes.LOGOUT_USER,
});
