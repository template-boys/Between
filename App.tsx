import "react-native-gesture-handler";
import * as React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import FlashMessage from "react-native-flash-message";

import rootReducer from "./rootReducer";
import Navigator from "./tsx/navigation/Navigator";
import { StatusBar, Text, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import thunk from "redux-thunk";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "501057678471-7avl7nsmkrd0h4d2g1q477r0faoh2gu4.apps.googleusercontent.com",
});

import { Component } from "react";

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
        <FlashMessage position={"center"} style={styles.flashMessageBanner} />
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
