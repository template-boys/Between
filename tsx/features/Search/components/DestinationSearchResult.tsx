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
    
  const getHeader = () => {
    if (searchResult.type == "POI") {
      return searchResult.poi?.name;
    } else if (
      searchResult.type == "Street" ||
      searchResult.type == "Cross Street"
    ) {
      return (
        searchResult.address?.streetName +
        ", " +
        searchResult.address?.municipality
      );
    } else if (searchResult.type == "Geography") {
      return searchResult.address?.municipality;
    }
  };

  const getSubText = () => {
    return searchResult.address?.freeformAddress;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Icon name={"location-sharp"} size={30} color={theme.darkPurple} />
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <Text style={[style.medium, styles.header]}>{getHeader()}</Text>
        <Text style={[style.regular, styles.subText]}>{getSubText()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme.purple,
    padding: 20,
  },
  header: { color: theme.darkestGrey },
  subText: {},
});

export default DestinationSearchResult;
