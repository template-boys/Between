import { StyleSheet } from "react-native";
import theme from "./theme";

export default StyleSheet.create({
  title1: {
    color: "#313131",
    fontWeight: "bold",
    fontSize: 30,
  },
  title2: {
    fontFamily: "Poppins-Regular",
    color: "#313131",
    fontSize: 20,
    fontWeight: "600",
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
