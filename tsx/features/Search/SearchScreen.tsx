import { getCenterOfBounds, getDistance } from "geolib";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import FullMapView from "./components/FullMapView";
import PlaceList from "./components/PlaceList";
import {
  addSearchLocation as addSearchLocationAction,
  removeSearchLocation as removeSearchLocationAction,
  getPlaceSearch as getPlaceSearchAction,
  getDirections,
} from "./redux/searchActions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AutoCompleteInputField from "../../components/AutoCompleteInputField";
import { tomTomAutoComplete } from "../../api/thirdPartyApis";
import AutoCompleteSearchResult from "./components/AutoCompleteSearchResult";
import { getMiddlePoint } from "./utils/directionsUtils";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function SearchScreen({ navigation }): ReactElement {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [autoCompleteValues, setAutoCompleteValues] = useState([]);
  const [isAutoCompleteFocus, setIsAutoCompleteFocus] = useState<boolean>(
    false
  );
  const searchBottomSheetRef = useRef<any | null>(null);

  const searchLocations = useSelector(
    (state) => state.searchReducer.searchLocations
  );
  const searchResult = useSelector(
    (state) => state.searchReducer.searchResult?.businesses ?? []
  );
  const userLocation = useSelector((state) => state.searchReducer.userLocation);
  const searchType = useSelector((state) => state.searchReducer.searchType);
  const searchLoading = useSelector(
    (state) => state.searchReducer.searchLoading
  );

  //Search Actions
  const addSearchLocation = (location) => {
    dispatch(addSearchLocationAction(location));
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
  const getPlaceSearch = async (query) => {
    let locationCoords: any[] = [];
    searchLocations.forEach((location) => {
      locationCoords.push({
        latitude: location?.position?.lat,
        longitude: location?.position?.lon,
      });
    });
    let middlePoint;

    if (locationCoords.length === 2) {
      const distance = getDistance(locationCoords[0], locationCoords[1]);
      console.log(distance);

      if (distance < 15000) {
        middlePoint = getCenterOfBounds(locationCoords);
      } else {
        dispatch(getDirections(locationCoords[0], locationCoords[1]));
        middlePoint = await getMiddlePoint(
          locationCoords[0],
          locationCoords[1]
        );
      }
    } else {
      middlePoint = getCenterOfBounds(locationCoords);
    }
    dispatch(getPlaceSearchAction(query, middlePoint));
  };

  const autoInputRef = useRef<any | null>(null);

  useEffect(() => {
    if (searchLocations.length > 1) {
      getPlaceSearch(searchType);
    }
  }, [searchLocations, searchType]);

  const debouncedAutoCompleteCall = debounce(async (query) => {
    if (!query) {
      setAutoCompleteValues([]);
      return;
    }
    const result = await tomTomAutoComplete(query, userLocation);
    setAutoCompleteValues(result?.data?.results ?? []);
  }, 1000);

  const getAutoCompleteResults = (query) => {
    if (!query) {
      setAutoCompleteValues([]);
      return;
    }
    debouncedAutoCompleteCall(query);
  };

  const [mapHeight, setMapHeight] = useState(SCREEN_HEIGHT);

  return (
    <>
      {isAutoCompleteFocus ? <View style={styles.searchBackground} /> : null}
      <View style={[styles.container, { marginTop: insets.top }]}>
        <AutoCompleteInputField
          inputRef={autoInputRef}
          leftIcon={
            isAutoCompleteFocus ? "return-up-back-outline" : "search-outline"
          }
          onLeftIconPress={() => {
            if (!isAutoCompleteFocus) {
              autoInputRef?.current?.focus();
            } else {
              Keyboard.dismiss();
              setAutoCompleteValues([]);
              setIsAutoCompleteFocus(false);
            }
          }}
          inputProps={{
            onChange: (value) => {
              getAutoCompleteResults(value);
            },
            onFocus: () => {
              setIsAutoCompleteFocus(true);
            },
          }}
        />
        {searchLocations.length > 1 && !isAutoCompleteFocus && (
          <PlaceList
            searchResult={searchResult}
            searchLoading={searchLoading}
            navigation={navigation}
            bottomSheetRef={searchBottomSheetRef}
            setMapHeight={setMapHeight}
          />
        )}
        {isAutoCompleteFocus ? (
          <FlatList
            data={autoCompleteValues}
            style={styles.flatListContainer}
            contentContainerStyle={styles.listContainer}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always"
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  addSearchLocation(item);
                  setIsAutoCompleteFocus(false);
                  Keyboard.dismiss();
                  setAutoCompleteValues([]);
                  autoInputRef.current?.clear();
                }}
              >
                <AutoCompleteSearchResult searchResult={item} />
              </TouchableOpacity>
            )}
          />
        ) : null}
      </View>
      <FullMapView
        searchLocations={searchLocations}
        onRemovePress={removeSearchLocation}
        searchResult={searchResult}
        mapHeight={mapHeight}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBackground: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "white",
  },
  autoCompleteStyle: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  flatListContainer: {
    zIndex: -5,
    width: SCREEN_WIDTH,
    flex: 1,
    marginTop: 10,
    backgroundColor: "white",
  },
  listContainer: {
    backgroundColor: "white",
  },
});
