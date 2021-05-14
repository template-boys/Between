import { getCenterOfBounds, getDistance } from "geolib";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import FullMapView from "./components/FullMapView";
import DestinationBottomView from "./components/DestinationBottomView";
import OriginBottomView from "./components/OriginBottomView";
import {
  addOrigin as addOriginLocationAction,
  removeOriginLocation as removeOriginLocationAction,
  getDestinationSearch as getDestinationSearchAction,
  getRouteGeometries,
  setDestinations,
} from "./redux/searchActions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AutoCompleteInputField from "../../components/AutoCompleteInputField";
import { tomTomAutoComplete } from "../../api/thirdPartyApis";
import AutoCompleteSearchResult from "./components/AutoCompleteSearchResult";
import { getMiddlePoint } from "../../utils/routeUtils";
import { State } from "../../../rootReducer";
import { Coordinate, TomTomOriginResult } from "./redux/searchReducerTypes";
import { Text } from "react-native-elements";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function SearchScreen({ navigation }): ReactElement {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [autoCompleteValues, setAutoCompleteValues] = useState<
    Array<TomTomOriginResult>
  >([]);
  const [isAutoCompleteFocus, setIsAutoCompleteFocus] = useState<boolean>(
    false
  );
  const searchBottomSheetRef = useRef<any | null>(null);

  const origins = useSelector((state: State) => state.searchReducer.origins);
  const destinations = useSelector(
    (state: State) => state.searchReducer.destinations
  );
  const userLocation = useSelector(
    (state: State) => state.searchReducer.userLocation
  );
  const destinationType = useSelector(
    (state: State) => state.searchReducer.destinationType
  );
  const destinationSearchLoading = useSelector(
    (state: State) => state.searchReducer.destinationSearchLoading
  );
  const selectedOriginIndex = useSelector(
    (state: State) => state.searchReducer.selectedOriginIndex
  );

  //Search Actions
  const addOriginLocation = (location: TomTomOriginResult) => {
    dispatch(addOriginLocationAction(location));
  };
  const setSearchLoading = (isLoading: boolean) => {
    dispatch(setSearchLoading(isLoading));
  };
  const removeOriginLocation = (index: number) => {
    dispatch(removeOriginLocationAction(index));
  };
  const setDestinationIndex = (index: number) => {
    dispatch(setDestinationIndex(index));
  };
  const getPlaceSearch = async (query: string) => {
    let locationCoords: Coordinate[] = [];
    origins.forEach((location: TomTomOriginResult) => {
      locationCoords.push({
        latitude: location?.position?.lat,
        longitude: location?.position?.lon,
      });
    });
    let middlePoint: Coordinate;

    if (locationCoords.length === 2) {
      const distance = getDistance(locationCoords[0], locationCoords[1]);

      if (distance < 15000) {
        middlePoint = getCenterOfBounds(locationCoords);
      } else {
        middlePoint = await getMiddlePoint(
          locationCoords[0],
          locationCoords[1]
        );
      }
    } else {
      middlePoint = getCenterOfBounds(locationCoords);
    }
    dispatch(getDestinationSearchAction(query, middlePoint));
  };

  const autoInputRef = useRef<any | null>(null);

  useEffect(() => {
    if (origins.length > 1) {
      getPlaceSearch(destinationType);
    }
  }, [origins, destinationType]);

  const debouncedAutoCompleteCall = debounce(
    async (query: NativeSyntheticEvent<TextInputChangeEventData>) => {
      if (!query) {
        setAutoCompleteValues([]);
        return;
      }
      const result = await tomTomAutoComplete(query, userLocation);
      setAutoCompleteValues(result?.data?.results ?? []);
    },
    1000
  );

  const getAutoCompleteResults = (
    query: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    if (!query) {
      setAutoCompleteValues([]);
      return;
    }
    debouncedAutoCompleteCall(query);
  };

  const [mapHeight, setMapHeight] = useState(SCREEN_HEIGHT);

  const _renderBottomView = () => {
    if (selectedOriginIndex !== -1 && !isAutoCompleteFocus) {
      return <OriginBottomView setMapHeight={setMapHeight} />;
    } else if (origins.length > 1 && !isAutoCompleteFocus) {
      return (
        <DestinationBottomView
          destinations={destinations}
          destinationSearchLoading={destinationSearchLoading}
          navigation={navigation}
          bottomSheetRef={searchBottomSheetRef}
          setMapHeight={setMapHeight}
        />
      );
    }
  };

  //Set map height back to 100% if we removed an origin
  useEffect(() => {
    if (origins.length === 0 || origins.length === 1) {
      setMapHeight(SCREEN_HEIGHT);
      dispatch(setDestinations([]));
    }
  }, [origins]);

  return (
    <View style={styles.container}>
      {isAutoCompleteFocus ? <View style={styles.searchBackground} /> : null}
      <AutoCompleteInputField
        inputRef={autoInputRef}
        leftIcon={
          isAutoCompleteFocus ? "chevron-back-outline" : "search-outline"
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
        isAutoCompleteFocus={isAutoCompleteFocus}
      />
      {_renderBottomView()}
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
                addOriginLocation(item);
                setIsAutoCompleteFocus(false);
                Keyboard.dismiss();
                setAutoCompleteValues([]);
                autoInputRef.current?.clear();
              }}
            >
              <AutoCompleteSearchResult origin={item} />
            </TouchableOpacity>
          )}
        />
      ) : null}
      <FullMapView
        originLocations={origins}
        onRemovePress={removeOriginLocation}
        yelpDestinations={destinations}
        mapHeight={mapHeight}
      />
    </View>
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
  flatListContainer: {
    width: SCREEN_WIDTH,
    flex: 1,
    marginTop: 15,
    backgroundColor: "white",
  },
  listContainer: {
    backgroundColor: "white",
  },
});
