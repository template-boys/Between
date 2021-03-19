import React, { ReactElement } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../features/Profile/ProfileScreen";

interface Props {}

const ProfileStack = createStackNavigator();

export default function ProfileNavigator({}: Props): ReactElement {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Activity Screen" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}
