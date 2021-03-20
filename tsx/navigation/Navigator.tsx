import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import SearchNavigator from "./SearchNavigator";
import ActivityNavigator from "./ActivityNavigator";
import FavoritesNavigator from "./FavoritesNavigator";
import ProfileNavigator from "./ProfileNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../features/Login/LoginScreen";
import { useSelector, useDispatch } from "react-redux";
import theme from "../themes/theme";
import FirebaseAuth from "@react-native-firebase/auth";
import { loginUser, logoutUser } from "../../testActions";

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
          tabBarIcon: ({ color }) => (
            <Icon name="search-outline" size={30} color={color} />
          ),
        }}
        component={SearchNavigator}
      />
      <BottomTab.Screen
        name="Activity"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Icon name="list-outline" size={30} color={color} />
          ),
        }}
        component={ActivityNavigator}
      />
      <BottomTab.Screen
        name="Favorites"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Icon name="heart-outline" size={30} color={color} />
          ),
        }}
        component={FavoritesNavigator}
      />
      <BottomTab.Screen
        name="Profile"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Icon name="person-outline" size={30} color={color} />
          ),
        }}
        component={ProfileNavigator}
      />
    </BottomTab.Navigator>
  );
}

function Navigator() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.testReducer.loggedIn);

  FirebaseAuth().onAuthStateChanged((user) => {
    if (user !== null && user !== undefined) {
      dispatch(loginUser(user));
    } else {
      dispatch(logoutUser());
    }
  });

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {isLoggedIn ? (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
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

export default Navigator;
