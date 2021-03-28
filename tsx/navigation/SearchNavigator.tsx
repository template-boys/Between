import React, { ReactElement } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import SearchResultsScreen from "../features/Search/SearchResultsScreen";
import theme from "../themes/theme";
import SearchScreen from "../features/Search/SearchScreen";
import PlaceDetailsScreen from "../features/Search/PlaceDetailsScreen";

interface Props {}

const SearchStack = createStackNavigator();

export default function SearchNavigator({}: Props): ReactElement {
  return (
    <SearchStack.Navigator
      screenOptions={(props) => {
        return {
          headerLeft: ({ canGoBack }) =>
            canGoBack && (
              <Icon
                name="arrow-back-outline"
                size={30}
                color={theme.darkPurple}
                onPress={() => {
                  props.navigation.goBack();
                }}
              />
            ),
          headerLeftContainerStyle: { paddingLeft: 10 },
        };
      }}
    >
      <SearchStack.Screen
        name="In Between"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <SearchStack.Screen
        name="Search Screen 2"
        component={SearchResultsScreen}
      />
      <SearchStack.Screen
        name="PlaceDetailsScreen"
        component={PlaceDetailsScreen}
        options={{
          title: "Details",
        }}
      />
    </SearchStack.Navigator>
  );
}
