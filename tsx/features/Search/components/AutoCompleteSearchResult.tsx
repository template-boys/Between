import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import style from "../../../themes/style";
import theme from "../../../themes/theme";
import { TomTomOriginResult } from "../redux/searchReducerTypes";

interface AutoCompleteSearchResultProps {
  containerStyle?: ViewStyle;
  origin: TomTomOriginResult;
}

const AutoCompleteSearchResult = ({
  origin,
  containerStyle,
}: AutoCompleteSearchResultProps) => {
  const getGeographyTypeHeader = () => {
    switch (origin.entityType) {
      case "Country":
        return origin.address?.country ?? origin.address?.freeformAddress;
      case "PostalCodeArea":
        return origin.address?.postalCode;
      case "Municipality":
        return origin.address?.municipality;
      default:
        return origin.address?.freeformAddress;
    }
  };

  const getHeader = () => {
    switch (origin.type) {
      case "POI":
        return origin.poi?.name;
      case "Street":
      case "Cross Street":
        return !!origin.address?.streetName
          ? origin.address?.streetName
          : origin.address?.freeformAddress;
      case "Geography":
        return getGeographyTypeHeader();
      case "Point Address":
      case "Address Range":
        return `${origin.address?.streetNumber} ${origin.address?.streetName}`;
      default:
        break;
    }
  };

  const getSubText = () => {
    return origin.address?.freeformAddress;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Icon name={"location-outline"} size={30} color={theme.secondary} />
      <View style={{ marginLeft: 10, marginRight: 25 }}>
        <Text style={[style.medium, styles.header]}>{getHeader()}</Text>
        <Text style={style.regular}>{getSubText()}</Text>
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
    backgroundColor: "white",
  },
  header: { color: theme.darkestGrey, fontSize: 16 },
});

export default AutoCompleteSearchResult;
