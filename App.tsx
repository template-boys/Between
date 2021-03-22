import "react-native-gesture-handler";
import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import testReducer from "./testReducer";
import Navigator from "./tsx/navigation/Navigator";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

function App() {
  const store = createStore(testReducer);
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          translucent={true}
          networkActivityIndicatorVisible={true}
        />
        <Navigator />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
