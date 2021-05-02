import theme from "../../../themes/theme";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";

export const types = [
  <Icon style={{}} name="search-outline" size={20} color={theme.purple} />,
  "Coffee",
  "Pizza",
  "Mexican",
  "Italian",
  "Chinese",
  "Bar",
  "Fast Food",
];

export const YelpTransactionEnum = {
  PICKUP: "pickup",
  DELIVERY: "delivery",
  RESTAURANT_RESERVATION: "restaurant_reservation",
};

export const TomTomLocationTypeEnum = {
  POI: "POI",
  STREET: "Street",
  GEOGRAPHY: "Geography",
  POINT_ADDRESS: "Point Address",
  ADDRESS_RANGE: "Address Range",
  CROSS_STREET: "Cross Street",
};
