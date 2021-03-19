import React, { ReactElement } from "react";
import { Text, View } from "react-native";

interface Props {}

export default function ActivityScreen({}: Props): ReactElement {
  return (
    <View>
      <Text>This is the activity screen.</Text>
    </View>
  );
}
