import React, { useRef, useState } from "react";
import {
  View,
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
  containerStyle?: ViewStyle | ViewStyle[];
  inputContainerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle;
  iconName?: string;
  rightIconName?: string;
  hasError?: boolean;
  onLeftIconPress?: () => void | null | undefined;
  onRightIconPress?: () => void | null | undefined;
  rightIconSize?: number;
  leftIconSize?: number;
  leftIconColor?: string;
}

const CustomInput = ({
  inputRef,
  onChange,
  containerStyle,
  inputContainerStyle,
  iconName,
  hasError,
  rightIconName,
  leftIconColor,
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
              size={props.leftIconSize}
              color={!!hasError ? theme.errorRed : leftIconColor}
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
          placeholderTextColor={theme.lightGrey}
          style={[
            style.regular,
            styles.inputStyle,
            props.inputStyle,
            { color: theme.lightGrey },
          ]}
          autoCompleteType={props.autoCompleteType || "off"}
          autoCapitalize={props.autoCapitalize || "none"}
          autoCorrect={props.autoCorrect || false}
          {...props}
        />
        {rightIconName && (
          <TouchableOpacity
            onPress={() => {
              !!props.onRightIconPress && props.onRightIconPress();
            }}
            activeOpacity={!!props.onRightIconPress ? 0.2 : 1}
          >
            <Icon
              name={rightIconName}
              size={props.rightIconSize}
              color={!!hasError ? theme.errorRed : theme.darkPurple}
            />
          </TouchableOpacity>
        )}
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
    backgroundColor: theme.darkestGrey,
  },
});

CustomInput.defaultProps = {
  rightIconSize: 24,
  leftIconSize: 24,
  leftIconColor: theme.darkPurple,
};
export default CustomInput;
