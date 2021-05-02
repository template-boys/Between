import React, { ReactElement } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { setDestinationIndex, setDestinationType } from "../redux/searchActions";
import { types } from "../constants/searchConstants";
import theme from "../../../themes/theme";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  isSelected: boolean;
  index: number;
  destinationItem: any;
  typeCarouselRef: any;
  carouselRef: any;
  setCurrentTypeIndex: (number) => void;
}

export default function DestinationTypeListItem({
  isSelected,
  index,
  destinationItem,
  typeCarouselRef,
  carouselRef,
  setCurrentTypeIndex,
}: Props): ReactElement {
  const dispatch = useDispatch();
  return index === 0 ? (
    <TouchableOpacity
      style={[
        styles.searchButton,
        isSelected && { borderColor: theme.darkPurple },
      ]}
      onPress={() => {
        setCurrentTypeIndex(0);
      }}
    >
      <Icon name={"search-outline"} size={20} color={"#a8a8a8"} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => {
        dispatch(setDestinationIndex(0));
        setCurrentTypeIndex(index);
        typeCarouselRef.current?.scrollToIndex({
          index: index,
          viewPosition: 0.5,
        });
        carouselRef.current?.snapToItem(0);
        dispatch(setDestinationType(types[index]));
      }}
      style={[styles.typeButton, isSelected && styles.selectedTypeButton]}
    >
      <Text
        style={{
          color: isSelected ? "white" : "#a8a8a8",
          fontWeight: "500",
          justifyContent: "center",
        }}
      >
        {destinationItem}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  typeButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    minWidth: 80,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "white",
    borderColor: "#F2F2F2",
    borderWidth: 2,
    marginHorizontal: 5,
  },
  selectedTypeButton: {
    backgroundColor: theme.darkPurple,
    shadowColor: "#7A48FF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 1,
    borderWidth: 0,
  },
  searchButton: {
    backgroundColor: "white",
    borderColor: "#F2F2F2",
    borderWidth: 2,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
});
