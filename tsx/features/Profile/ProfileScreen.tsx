import React, { ReactElement } from "react";
import { Text, View } from "react-native";
import Button from "../../components/Button";
import FirebaseAuth from "@react-native-firebase/auth";

interface Props {}

export default function ProfileScreen({}: Props): ReactElement {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.9 }}>
        <Text>This is the profile screen.</Text>
      </View>
      <View style={{ flex: 0.1 }}>
        <Button
          title="Log Out"
          onPress={() => FirebaseAuth().signOut()}
          type="primary"
        />
      </View>
    </View>
  );
}
