import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { LoginActionTypes } from "./loginActionTypes";

export interface LoginReducer {
  loggedIn: boolean;
  user: FirebaseAuthTypes.User | null;
}

export interface LoginAction {
  type: LoginActionTypes;
  payload?: any;
}
