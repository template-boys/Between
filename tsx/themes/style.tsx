import { StyleSheet } from "react-native";
import theme from "./theme";

export default StyleSheet.create({
  light: {
    fontFamily: "Poppins-Regular",
    fontWeight: "300",
    fontSize: 14,
    color: "#7a7a7a",
  },
  regular: {
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    fontSize: 15,
    color: "#a8a8a8",
  },
  medium: {
    fontFamily: "Poppins-Regular",
    fontWeight: "500",
    fontSize: 15,
    color: theme.darkPurple,
  },
  semiBold: {
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
    fontSize: 20,
    color: "#313131",
    lineHeight: 22,
  },
  bold: {
    fontFamily: "Poppins-Regular",
    fontWeight: "700",
    fontSize: 25,
    color: "#313131",
  },
  body1: {
    color: theme.darkestGrey,
    fontSize: 16,
    lineHeight: 20,
  },
  body2: {
    color: theme.darkestGrey,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
  },
  body3: {
    color: theme.darkestGrey,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
  },
  body4: {
    color: theme.darkestGrey,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "normal",
  },
  body5: {
    color: theme.darkestGrey,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "400",
  },
  body6: {
    color: theme.darkestGrey,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "900",
  },
  caption1: {
    color: theme.darkestGrey,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
  },
});
