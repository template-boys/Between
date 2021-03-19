import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import SearchNavigator from "./SearchNavigator";
import ActivityNavigator from "./ActivityNavigator";
import FavoritesNavigator from "./FavoritesNavigator";
import ProfileNavigator from "./ProfileNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../features/Login/LoginScreen";
import { useSelector } from "react-redux";
import theme from "../themes/theme";

const BottomTab = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const RootStack = createStackNavigator();

function Auth() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
    </AuthStack.Navigator>
  );
}

function App() {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        tabStyle: {
          paddingTop: 10,
        },
        inactiveBackgroundColor: "white",
        activeBackgroundColor: "white",
        activeTintColor: theme.darkPurple,
        inactiveTintColor: theme.purple,
        style: {
          backgroundColor: "white",
          height: 90,
        },
      }}
    >
      <BottomTab.Screen
        name="Search"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Icon name="search-outline" size={30} color={color} />
          ),
        }}
        component={SearchNavigator}
      />
      <BottomTab.Screen
        name="Activity"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Icon name="list-outline" size={30} color={color} />
          ),
        }}
        component={ActivityNavigator}
      />
      <BottomTab.Screen
        name="Favorites"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart-outline" size={30} color={color} />
          ),
        }}
        component={FavoritesNavigator}
      />
      <BottomTab.Screen
        name="Profile"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" size={30} color={color} />
          ),
        }}
        component={ProfileNavigator}
      />
    </BottomTab.Navigator>
  );
}

function BottomNavigator() {
  const isLoggedIn = useSelector((state) => state.testReducer.loggedIn);
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {isLoggedIn ? (
          <RootStack.Screen
            options={{ headerShown: false }}
            name="App"
            component={App}
          />
        ) : (
          <RootStack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: false }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default BottomNavigator;
