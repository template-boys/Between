import React, { useRef } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { Input as RNEInput } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import theme from "../themes/theme";

interface Props {
  onChangeText: (value: string) => void;
  label?: string;
  placeholder: string;
  autoCapitalize?: boolean;
  containerStyle?: ViewStyle;
  secureTextEntry?: boolean;
  errorMessage?: string;
  email?: boolean;
}

const Input = (props: Props) => {
  const containerStyle = [styles.containerStyle, props.containerStyle];
  let iconType = "";
  if (props.secureTextEntry) {
    iconType = "lock-closed-outline";
  } else if (props.email) {
    iconType = "mail-outline";
  }

  const ref = useRef<any | null>(null);

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
      inputContainerStyle={{
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: "#EDEDED",
        paddingLeft: 15,
        height: 60,
      }}
      label={props.label}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      autoCapitalize={props.autoCapitalize ? "words" : "none"}
      secureTextEntry={props.secureTextEntry}
      errorMessage={props.errorMessage}
      autoCompleteType="off"
      autoCorrect={false}
      leftIcon={
        iconType !== "" && (
          <Icon
            name={iconType}
            size={24}
            color={!!props.errorMessage ? theme.errorRed : theme.darkPurple}
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
    color: "#7a7a7a",
    fontSize: 14,
    fontWeight: "300",
    fontFamily: "Poppins-Regular",
  },
  containerStyle: {
    paddingLeft: 20,
    paddingRight: 20,
    margin: 0,
  },
  labelStyle: {
    color: theme.charcoalGrey,
  },
});
