import React, { ReactElement } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import SearchScreen from "../features/Search/SearchScreen";
import SearchResultsScreen from "../features/Search/SearchResultsScreen";
import theme from "../themes/theme";

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
                color={theme.purple}
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
    </SearchStack.Navigator>
  );
}
