import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { LoginActionTypes } from "./loginActionTypes";
import { LoginAction } from "./loginReducerTypes";

export const loginUser = (user: FirebaseAuthTypes.User): LoginAction => ({
  type: LoginActionTypes.LOGIN_USER,
  payload: user,
});

export const logoutUser: LoginAction = {
  type: LoginActionTypes.LOGOUT_USER,
};
