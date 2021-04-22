import React from "react";
import {
  Dimensions,
  StyleSheet,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import CustomInput from "./CustomInput";

interface AutoCompleteInputProps {
  onLeftIconPress?: () => void;
  inputProps?: TextInputProps;
  leftIcon?: string;
  inputRef?: any;
}

function AutoCompleteInputField(props: AutoCompleteInputProps) {
  return (
    <View style={styles.container}>
      <CustomInput
        inputRef={props.inputRef}
        placeholder="Search city, address, or place"
        inputContainerStyle={styles.inputContainer}
        iconName={props.leftIcon}
        clearButtonMode="always"
        onLeftIconPress={
          !!props.onLeftIconPress
            ? () => {
                !!props.onLeftIconPress && props.onLeftIconPress();
                props.inputRef?.current?.clear();
              }
            : undefined
        }
        {...props.inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  inputContainer: {
    borderRadius: 35,
    backgroundColor: "white",
    height: 50,
    borderWidth: 0,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
});

export default AutoCompleteInputField;
