import React, { useRef } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { Input as RNEInput, withTheme } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import theme from "../themes/theme";

interface Props {
  onChangeText: (value: string) => void;
  label?: string;
  placeholder: string;
  autoCapitalize?: boolean;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  secureTextEntry?: boolean;
  errorMessage?: string;
  email?: boolean;
  hasError?: boolean;
  onSubmitEditing?: any;
  inputRef?: any;
  isMapSearch?: boolean;
}

const Input = (props: Props) => {
  const containerStyle = [styles.containerStyle, props.containerStyle];
  let iconType = "";

  if (props.secureTextEntry) {
    iconType = "lock-closed-outline";
  } else if (props.email) {
    iconType = "mail-outline";
  } else if (props.isMapSearch) {
    iconType = "locate-outline";
  }

  const ref = props.inputRef || useRef<any | null>(null);

  if (ref !== null && !!props.errorMessage) {
    ref?.current?.shake();
  }

  return (
    <RNEInput
      ref={ref}
      labelStyle={styles.labelStyle}
      inputStyle={styles.inputStyle}
      placeholderTextColor={"#A8A8A8"}
      containerStyle={containerStyle}
      inputAccessoryViewID="Done"
      returnKeyType="go"
      inputContainerStyle={[
        {
          borderRadius: 10,
          borderWidth: 2,
          borderColor: "#e3e3e3",
          paddingLeft: 15,
          height: 60,
          //need to explicitly set bottom border width
          borderBottomWidth: 2,
        },
        props.inputContainerStyle,
      ]}
      label={props.label}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      autoCapitalize={props.autoCapitalize ? "words" : "none"}
      secureTextEntry={props.secureTextEntry}
      errorMessage={props.errorMessage}
      autoCompleteType="off"
      autoCorrect={false}
      onSubmitEditing={props.onSubmitEditing}
      leftIcon={
        iconType !== "" && (
          <Icon
            name={iconType}
            size={24}
            color={
              !!props.errorMessage || !!props.hasError
                ? theme.errorRed
                : theme.darkPurple
            }
          />
        )
      }
    />
  );
};

Input.defaultProps = {
  autoCapitalize: false,
  secureTextEntry: false,
  email: false,
};

export default Input;

const styles = StyleSheet.create({
  inputStyle: {
    padding: 12,
    color: "#313131",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
  },
  containerStyle: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  labelStyle: {
    color: theme.charcoalGrey,
  },
});
