import React from "react";
import { StyleSheet } from "react-native";
import { Button as RNEButton } from "react-native-elements";
import theme from "../themes/theme";

interface Props {
  type: string;
  title: string;
  buttonStyle?: object;
  disabled?: boolean;
  onPress?: (...args: any[]) => void;
  icon?: any;
}

const Button = (props: Props) => {
  const backgroundColor =
    props.type === "primary" ? theme.darkPurple : "transparent";
  const borderColor = props.type === "secondary" ? theme.darkPurple : "";
  const borderWidth = props.type === "secondary" ? 2 : 0;
  const titleStyle =
    props.type === "secondary" ? { color: theme.charcoalGrey } : {};
  const buttonStyle = [
    styles.buttonStyle,
    {
      backgroundColor,
      borderColor,
      borderWidth,
    },
    props.buttonStyle,
  ];
  return (
    <RNEButton
      buttonStyle={buttonStyle}
      titleStyle={titleStyle}
      title={props.title}
      borderWidth={1}
      height={40}
      disabled={props.disabled}
      onPress={props.onPress}
      icon={props.icon}
      iconRight={!!props.icon}
    />
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonStyle: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 26,
    minWidth: 250,
  },
});
