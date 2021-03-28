import { getCenterOfBounds } from "geolib";
import React, { ReactElement, useEffect, useRef } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";

import FullMapView from "./components/FullMapView";
import PlaceList from "./components/PlaceList";
import SearchBottomSheet from "./components/SearchBottomSheet";
import SearchBottomSheetView from "./components/SearchBottomSheetView";
import {
  addSearchLocation as addSearchLocationAction,
  setSearchType as setSearchTypeAction,
  removeSearchLocation as removeSearchLocationAction,
  getPlaceSearch as getPlaceSearchActon,
} from "./redux/searchActions";

export default function SearchScreen({ navigation }): ReactElement {
  const dispatch = useDispatch();
  const searchBottomSheetRef = useRef<any | null>(null);
  const openPagesheet = () => {
    searchBottomSheetRef.current?.open();
  };
  const closePagesheet = () => {
    searchBottomSheetRef.current?.close();
  };

  const searchLocations = useSelector(
    (state) => state.searchReducer.searchLocations
  );
  const searchResult = useSelector(
    (state) => state.searchReducer.searchResult?.businesses ?? []
  );
  const searchType = useSelector((state) => state.searchReducer.searchType);
  const searchLoading = useSelector(
    (state) => state.searchReducer.searchLoading
  );

  //Search Actions
  const addSearchLocation = (location) => {
    dispatch(addSearchLocationAction(location));
  };
  const setSearchType = (type) => {
    dispatch(setSearchTypeAction(type));
  };
  const setSearchLoading = (isLoading: boolean) => {
    dispatch(setSearchLoading(isLoading));
  };
  const removeSearchLocation = (index: number) => {
    dispatch(removeSearchLocationAction(index));
  };
  const setPlaceIndex = (index: number) => {
    dispatch(setPlaceIndex(index));
  };
  const getPlaceSearch = (query) => {
    let locationCoords: any[] = [];
    searchLocations.forEach((location) => {
      locationCoords.push({
        latitude: location.geometry.location.lat,
        longitude: location.geometry.location.lng,
      });
    });
    const middlePoint = getCenterOfBounds(locationCoords);
    dispatch(getPlaceSearchActon(query, middlePoint));
  };

  useEffect(() => {
    if (searchLocations.length > 1) {
      getPlaceSearch(searchType);
    } else if (searchLocations.length === 1) {
      showMessage({
        message: "Add more locations to find your between spot.",
        type: "info",
        onPress: () => {
          openPagesheet();
        },
      });
    }
  }, [searchLocations, searchType]);

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
          searchLocations={searchLocations}
          onRemovePress={removeSearchLocation}
          searchResult={searchResult}
        />
      </View>
      {searchLocations.length > 1 && (
        <PlaceList
          searchResult={searchResult}
          searchLoading={searchLoading}
          navigation={navigation}
        />
      )}
      <SearchBottomSheet ref={searchBottomSheetRef}>
        <SearchBottomSheetView
          addSearchLocation={(location) => {
            addSearchLocation(location);
            closePagesheet();
          }}
        />
      </SearchBottomSheet>
    </View>
  );
}
