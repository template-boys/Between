import React, { ReactElement } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ActivityScreen from "../features/Activity/ActivityScreen";

interface Props {}

const ActivityStack = createStackNavigator();

export default function ActivityNavigator({}: Props): ReactElement {
  return (
    <ActivityStack.Navigator>
      <ActivityStack.Screen name="Activity Screen" component={ActivityScreen} />
    </ActivityStack.Navigator>
  );
}
