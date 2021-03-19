import "react-native-gesture-handler";
import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import testReducer from "./testReducer";
import BottomNavigator from "./tsx/navigation/Navigator";

function App() {
  const store = createStore(testReducer);
  return (
    <Provider store={store}>
      <BottomNavigator />
    </Provider>
  );
}

export default App;
