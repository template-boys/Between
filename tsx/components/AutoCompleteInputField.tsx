import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import CustomInput from "./CustomInput";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
interface AutoCompleteInputProps {
  inputRef?: any;
  containerStyle?: ViewStyle;
  inputProps?: TextInputProps;
}

function AutoCompleteInputField(props: AutoCompleteInputProps) {
  return (
    <View style={[styles.container, props.containerStyle]}>
      <CustomInput
        inputRef={props.inputRef}
        placeholder="Search city, address, or place"
        inputContainerStyle={styles.inputContainer}
        iconName={"search"}
        clearButtonMode="while-editing"
        {...props.inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    borderRadius: 35,
    backgroundColor: "white",
    height: 50,
    borderWidth: 0,
    shadowColor: "black",
    shadowOpacity: 0.06,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 15 },
  },
});

export default AutoCompleteInputField;
