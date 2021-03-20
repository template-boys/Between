import "react-native-gesture-handler";
import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import testReducer from "./testReducer";
import Navigator from "./tsx/navigation/Navigator";

function App() {
  const store = createStore(testReducer);
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;
