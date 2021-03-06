import React from "react";
import { StyleSheet, TextInputProps, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../themes/theme";
import CustomInput from "./CustomInput";

interface AutoCompleteInputProps {
  onLeftIconPress?: () => void;
  inputProps?: TextInputProps;
  leftIcon?: string;
  inputRef?: any;
  isAutoCompleteFocus: boolean;
}

function AutoCompleteInputField(props: AutoCompleteInputProps) {
  const insets = useSafeAreaInsets();
  let inputStyles = [styles.inputContainer];
  return (
    <View style={[styles.container, { marginTop: insets.top + 10 }]}>
      <CustomInput
        leftIconColor={theme.secondary}
        inputRef={props.inputRef}
        placeholder={
          props.isAutoCompleteFocus
            ? "Search city, address, or place"
            : "Add places to search between"
        }
        inputContainerStyle={[
          styles.inputContainer,
          props.isAutoCompleteFocus ? styles.inputContainerSelected : {},
        ]}
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
        inputStyle={
          props.isAutoCompleteFocus
            ? { backgroundColor: theme.backgroundDark }
            : {}
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
    zIndex: 10,
  },
  inputContainer: {
    borderRadius: 35,
    height: 50,
    borderWidth: 0,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: theme.darkestGrey,
  },
  inputContainerSelected: {
    backgroundColor: theme.backgroundDark,
  },
});

export default AutoCompleteInputField;
