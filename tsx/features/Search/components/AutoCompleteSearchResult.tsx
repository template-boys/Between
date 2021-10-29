import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import style from "../../../themes/style";
import theme from "../../../themes/theme";
import { getHeader, getSubText } from "../../../utils/originUtil";
import { TomTomOriginResult } from "../redux/searchReducerTypes";

interface AutoCompleteSearchResultProps {
  containerStyle?: ViewStyle;
  origin: TomTomOriginResult;
}

const AutoCompleteSearchResult = ({
  origin,
  containerStyle,
}: AutoCompleteSearchResultProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Icon name={"location-outline"} size={30} color={theme.secondary} />
      <View style={{ marginLeft: 10, marginRight: 25 }}>
        <Text style={[style.medium, styles.header, { color: "white" }]}>
          {getHeader(origin)}
        </Text>
        <Text style={style.regular}>{getSubText(origin)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 25,
    paddingTop: 18,
    paddingBottom: 18,
  },
  header: { color: theme.darkestGrey, fontSize: 16 },
});

export default AutoCompleteSearchResult;
