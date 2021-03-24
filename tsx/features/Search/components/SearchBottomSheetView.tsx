import React from "react";
import { View, Dimensions } from "react-native";
import AutoCompleteInputField from "../../../components/AutoCompleteInputField";

interface Props {
  addSearchLocation: (any) => void;
}
export default function SearchBottomSheetView({ addSearchLocation }: Props) {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get(
    "window"
  );
  return (
    <View
      style={{
        backgroundColor: "white",
        height: SCREEN_HEIGHT,
        paddingLeft: 25,
        paddingRight: 25,
      }}
    >
      <View style={{ marginTop: 15 }}>
        <AutoCompleteInputField
          setLocation={(location) => {
            addSearchLocation(location);
          }}
        />
      </View>
    </View>
  );
}
