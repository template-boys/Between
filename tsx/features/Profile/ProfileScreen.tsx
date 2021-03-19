import React, { ReactElement } from "react";
import { Text, View } from "react-native";

interface Props {}

export default function ProfileScreen({}: Props): ReactElement {
  return (
    <View>
      <Text>This is the profiel screen.</Text>
    </View>
  );
}
