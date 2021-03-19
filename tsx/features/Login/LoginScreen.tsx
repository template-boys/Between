import "react-native-gesture-handler";
import * as React from "react";
import { Text, SafeAreaView, View, Dimensions } from "react-native";
import { Input } from "react-native-elements";
import Button from "../../components/Button";
import { loginUser } from "../../../testActions";
import { useDispatch } from "react-redux";
import theme from "../../themes/theme";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export function LoginScreen() {
  const dispatch = useDispatch();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        alignSelf: "center",
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH / 1.7,
      }}
    >
      <>
        <View
          style={{
            backgroundColor: theme.darkPurple,
            position: "absolute",
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
          }}
        />
        <View
          style={{
            borderRadius: SCREEN_WIDTH,
            width: SCREEN_WIDTH * 2,
            height: SCREEN_WIDTH * 2,
            position: "absolute",
            bottom: 0,
            backgroundColor: "white",
            top: -50,
          }}
        />
      </>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "600",
          marginTop: 50,
          color: theme.purple,
        }}
      >
        {`}{`}
      </Text>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "600",
          color: theme.charcoalGrey,
        }}
      >
        inBetween
      </Text>
      <Input
        placeholder="yourname@example.com"
        label="Email"
        labelStyle={{
          color: theme.charcoalGrey,
          marginBottom: 8,
        }}
        inputStyle={{
          borderColor: theme.lightGrey,
          padding: 10,
          borderBottomWidth: 2,
          color: theme.black,
          paddingTop: 12,
          paddingBottom: 12,
        }}
        placeholderTextColor={theme.lightGrey}
        containerStyle={{ marginTop: 45, paddingLeft: 20, paddingRight: 20 }}
        inputContainerStyle={{ borderBottomWidth: 0 }}
      />
      <Input
        placeholder="yourpassword"
        secureTextEntry={true}
        label="Password"
        labelStyle={{
          color: theme.charcoalGrey,
          marginBottom: 8,
        }}
        inputStyle={{
          borderColor: theme.lightGrey,
          padding: 10,
          borderBottomWidth: 2,
          color: theme.black,
          paddingTop: 12,
          paddingBottom: 12,
        }}
        placeholderTextColor={theme.lightGrey}
        containerStyle={{
          marginTop: 15,
          paddingLeft: 20,
          paddingRight: 20,
        }}
        inputContainerStyle={{ borderBottomWidth: 0 }}
      />
      <View style={{ marginLeft: "auto" }}>
        <Text style={{ marginRight: 18 }}>Forgot Password?</Text>
      </View>
      <Button
        type="primary"
        title="Log In"
        onPress={() => {
          dispatch(loginUser());
        }}
        buttonStyle={{ width: 180, marginTop: 80 }}
      />
      <Button
        type="secondary"
        title="Sign Up"
        buttonStyle={{ width: 180, marginTop: 30 }}
        onPress={() => {}}
      />
    </SafeAreaView>
  );
}
