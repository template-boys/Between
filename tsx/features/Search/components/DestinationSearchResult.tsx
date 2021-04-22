import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import style from "../../../themes/style";
import theme from "../../../themes/theme";

interface DestinationSearchResultProps {
  containerStyle?: ViewStyle;
  searchResult: any;
}

const DestinationSearchResult = ({
  searchResult,
  containerStyle,
}: DestinationSearchResultProps) => {
  const getGeographyTypeHeader = (searchResult) => {
    switch (searchResult.entityType) {
      case "Country":
        return (
          searchResult.address?.country ?? searchResult.address?.freeformAddress
        );
      case "PostalCodeArea":
        return searchResult.address?.postalCode;
      case "Municipality":
        return searchResult.address?.municipality;
      default:
        return searchResult.address?.freeformAddress;
    }
  };

  const getHeader = () => {
    switch (searchResult.type) {
      case "POI":
        return searchResult.poi?.name;
      case "Street":
      case "Cross Street":
        return !!searchResult.address?.streetName
          ? searchResult.address?.streetName
          : searchResult.address?.freeformAddress;
      case "Geography":
        return getGeographyTypeHeader(searchResult);
      case "Point Address":
      case "Address Range":
        return `${searchResult.address?.streetNumber} ${searchResult.address?.streetName}`;
      default:
        break;
    }
  };

  const getSubText = () => {
    return searchResult.address?.freeformAddress;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Icon name={"location-outline"} size={30} color={theme.darkPurple} />
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

export default DestinationSearchResult;
