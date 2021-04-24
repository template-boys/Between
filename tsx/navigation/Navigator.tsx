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
import { loginUser, logoutUser } from "../features/Login/redux/loginActions";
import { TouchableOpacity } from "react-native-gesture-handler";

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

function bottomIcon(iconName, color, focused) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: focused ? theme.darkPurple : "transparent",
        borderRadius: 12,
        height: 38,
        width: 38,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon name={iconName} size={25} color={color} />
    </TouchableOpacity>
  );
}

function App() {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        showLabel: false,
        inactiveBackgroundColor: "white",
        activeBackgroundColor: "white",
        activeTintColor: "white",
        inactiveTintColor: theme.purple,
        style: {
          backgroundColor: "white",
          // height: 90,
        },
      }}
    >
      <BottomTab.Screen
        name="Search"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => {
            const iconName = focused ? "location" : "location-outline";
            return bottomIcon(iconName, color, focused);
          },
        }}
        component={SearchNavigator}
      />
      <BottomTab.Screen
        name="Activity"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => {
            const iconName = focused ? "list" : "list-outline";
            return bottomIcon(iconName, color, focused);
          },
        }}
        component={ActivityNavigator}
      />
      <BottomTab.Screen
        name="Favorites"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => {
            const iconName = focused ? "heart" : "heart-outline";
            return bottomIcon(iconName, color, focused);
          },
        }}
        component={FavoritesNavigator}
      />
      <BottomTab.Screen
        name="Profile"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => {
            const iconName = focused ? "person" : "person-outline";
            return bottomIcon(iconName, color, focused);
          },
        }}
        component={ProfileNavigator}
      />
    </BottomTab.Navigator>
  );
}

function Navigator() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.loginReducer.loggedIn);

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
