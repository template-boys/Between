import React, { ReactElement } from "react";
import { Text, View } from "react-native";
import Button from "../../components/Button";
import FirebaseAuth from "@react-native-firebase/auth";

interface Props {}

export default function ProfileScreen({}: Props): ReactElement {
  return (
    <View>
      <Text>This is the profiel screen.</Text>
      <Button
        title="Log Out"
        onPress={() => FirebaseAuth().signOut()}
        type="primary"
      />
    </View>
  );
}
