import "react-native-gesture-handler";
import * as React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "./rootReducer";
import Navigator from "./tsx/navigation/Navigator";
import { StatusBar, Text, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import thunk from "redux-thunk";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { Component } from "react";
import { GOOGLE_SIGN_IN_WEB_KEY } from "./tsx/utils/googleKeyUtil";

GoogleSignin.configure({
  webClientId: GOOGLE_SIGN_IN_WEB_KEY,
});

interface Props {}
interface State {
  didCatch: boolean;
}
const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { didCatch: false };
  }
  componentDidCatch(error, info) {
    console.log(error, "ERROR");

    this.setState({ didCatch: true });
  }

  render() {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            translucent={true}
            networkActivityIndicatorVisible={true}
          />
          {this.state.didCatch ? <Text>Error</Text> : <Navigator />}
        </SafeAreaProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  flashMessageBanner: {
    backgroundColor: "rgba(67, 128, 245, .85)",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 16,
  },
});
