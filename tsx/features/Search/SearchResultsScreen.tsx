import React, { ReactElement, useState } from "react";
import { Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { ListItem, Badge } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

import { useSelector } from "react-redux";
import theme from "../../themes/theme";
import { ScrollView } from "react-native-gesture-handler";
import MapLocationView from "./components/MapView";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default function SearchResultsScreen({}: Props): ReactElement {
  const searchResult = useSelector((state) => state.testReducer.searchResult);

  const locationOpen = (location) => {
    if (location.opening_hours) {
      if (location.opening_hours.open_now) {
        return "Open";
      } else {
        return "Closed";
      }
    } else {
      return null;
    }
  };

  const locationPriceLevel = (location) => {
    let dollars = "";
    for (let i = 0; i < location.price_level; i++) {
      dollars = dollars + "$";
    }
    return dollars;
  };

  return (
    <ScrollView>
      {!!searchResult &&
        searchResult.results.map((location, i) => (
          <ListItem key={i} bottomDivider>
            <MapLocationView
              diameter={100}
              location={{
                longitude: location.geometry.location.lng,
                latitude: location.geometry.location.lat,
              }}
              showShadow
            />
            <ListItem.Content style={{ minHeight: 100 }}>
              <ListItem.Title
                style={{ color: theme.charcoalGrey, fontWeight: "500" }}
              >
                {location.name}
              </ListItem.Title>
              <ListItem.Subtitle
                style={{ color: theme.charcoalGrey, fontWeight: "300" }}
              >
                {location.formatted_address}{" "}
              </ListItem.Subtitle>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <ListItem.Subtitle
                  style={{
                    paddingRight: 5,
                    color:
                      locationOpen(location) == "Open"
                        ? "green"
                        : theme.errorRed,
                  }}
                >
                  {locationOpen(location)}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={{ color: theme.darkPurple }}>
                  {locationPriceLevel(location)}
                </ListItem.Subtitle>
              </View>
            </ListItem.Content>
            <Icon
              name="chevron-forward-outline"
              size={30}
              color={theme.lightGrey}
            />
          </ListItem>
        ))}
    </ScrollView>
  );
}
