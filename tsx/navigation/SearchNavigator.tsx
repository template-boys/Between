import React, { ReactElement } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import theme from "../themes/theme";
import SearchScreen from "../features/Search/SearchScreen";
import DestinationDetailsScreen from "../features/Search/DestinationDetailsScreen";

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
        name="DestinationDetailsScreen"
        component={DestinationDetailsScreen}
        options={{
          title: "Details",
          headerShown: false,
        }}
      />
    </SearchStack.Navigator>
  );
}
