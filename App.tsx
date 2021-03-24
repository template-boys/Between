import "react-native-gesture-handler";
import * as React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import Navigator from "./tsx/navigation/Navigator";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import thunk from "redux-thunk";

function App() {
  const store = createStore(rootReducer, applyMiddleware(thunk));
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
