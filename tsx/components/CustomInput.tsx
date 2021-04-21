import React, { ReactElement, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import style from "../themes/style";
import theme from "../themes/theme";

export interface CustomInputProps extends TextInputProps {
  inputRef?: any;
  onChange?: (string) => void;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  iconName?: string;
  hasError?: boolean;
  onLeftIconPress?: () => void | null | undefined;
}

const CustomInput = ({
  inputRef,
  onChange,
  containerStyle,
  inputContainerStyle,
  iconName,
  hasError,
  ...props
}: CustomInputProps) => {
  const [text, setText] = useState<string>("");
  const customInputRef = useRef<any | null>(null);

  const ref = inputRef || customInputRef;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputContainer, inputContainerStyle]}>
        {iconName && (
          <TouchableOpacity
            onPress={() => {
              !!props.onLeftIconPress && props.onLeftIconPress();
            }}
            activeOpacity={!!props.onLeftIconPress ? 0.2 : 1}
          >
            <Icon
              name={iconName}
              size={24}
              color={!!hasError ? theme.errorRed : theme.darkPurple}
            />
          </TouchableOpacity>
        )}
        <TextInput
          ref={ref}
          onChangeText={(value) => {
            if (onChange) {
              onChange(value);
            }
          }}
          placeholderTextColor="#A8A8A8"
          style={[style.regular, styles.inputStyle, props.inputStyle]}
          autoCompleteType={props.autoCompleteType || "off"}
          autoCapitalize={props.autoCapitalize || "none"}
          autoCorrect={props.autoCorrect || false}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#e3e3e3",
    paddingLeft: 15,
    paddingRight: 15,
  },
  inputStyle: {
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
    height: "100%",
    color: "#313131",
    fontSize: 14,
    fontWeight: "400",
  },
});

export default CustomInput;
