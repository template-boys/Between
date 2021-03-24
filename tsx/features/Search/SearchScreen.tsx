import React, { ReactElement, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import FullMapView from "./components/FullMapView";
import PlaceList from "./components/PlaceList";
import SearchBottomSheet from "./components/SearchBottomSheet";
import SearchBottomSheetView from "./components/SearchBottomSheetView";

interface Props {
  searchLocations: any;
  searchType: string;
  searchLoading: boolean;
  searchResult: any;
  addSearchLocation: (any) => void;
  setSearchType: (any) => void;
  getPlaceSearch: (any) => void;
  removeSearchLocation: (index: number) => void;
}

export default function SearchScreen(props: Props): ReactElement {
  const searchBottomSheetRef = useRef<any | null>(null);
  const openPagesheet = () => {
    searchBottomSheetRef.current?.open();
  };
  const closePagesheet = () => {
    searchBottomSheetRef.current?.close();
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.75,
        }}
      >
        <FullMapView
          onIconPress={() => {
            openPagesheet();
          }}
          searchLocations={props.searchLocations}
          onRemovePress={props.removeSearchLocation}
        />
      </View>
      {props.searchLocations.length > 1 && (
        <PlaceList
          searchResult={props.searchResult}
          searchLoading={props.searchLoading}
        />
      )}
      <SearchBottomSheet ref={searchBottomSheetRef}>
        <SearchBottomSheetView
          addSearchLocation={(location) => {
            props.addSearchLocation(location);
            closePagesheet();
          }}
        />
      </SearchBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
