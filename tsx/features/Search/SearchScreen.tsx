import React, { ReactElement, useRef, useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import BottomSheet from "reanimated-bottom-sheet";
import AutoCompleteInputField from "../../components/AutoCompleteInputField";
import { addSearchLocation, setSearchResult } from "../../../testActions";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../themes/theme";
import { placeSearch } from "../../api/PlaceSearch";
import { getCenterOfBounds } from "geolib";
import Icon from "react-native-vector-icons/Ionicons";
import FullMapView from "./components/FullMapView";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default function SearchScreen({ navigation }: Props): ReactElement {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchLocations = useSelector(
    (state) => state.testReducer.searchLocations
  );

  const carouselRef = useRef<any | null>(null);
  const sheetRef = React.useRef<BottomSheet>(null);

  const setLocation = (location) => {
    dispatch(addSearchLocation(location));
    sheetRef.current?.snapTo(1);
  };

  const handleSearch = async () => {
    navigation.navigate("Search Screen 2");
    setIsLoading(true);
    let middlePoint;
    let locationCoords: any[] = [];
    searchLocations.forEach((location) => {
      locationCoords.push({
        latitude: location.geometry.location.lat,
        longitude: location.geometry.location.lng,
      });
    });

    middlePoint = getCenterOfBounds(locationCoords);
    const searchResult = await placeSearch(search, "en", middlePoint);
    setIsLoading(false);
    dispatch(setSearchResult(searchResult.data));
  };

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get(
    "window"
  );
  const showSearchInput = searchLocations.length !== 0;

  const renderContent = () => (
    <View
      style={{
        backgroundColor: theme.lightestGrey,
        height: SCREEN_HEIGHT,
        paddingLeft: 25,
        paddingRight: 25,
      }}
    >
      <Icon
        name="remove-outline"
        size={40}
        color={theme.charcoalGrey}
        style={{ alignSelf: "center" }}
      />
      <AutoCompleteInputField setLocation={setLocation} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.75,
        }}
      >
        <FullMapView
          onIconPress={() => {
            sheetRef.current?.snapTo(0);
          }}
        />
      </View>

      <View
        style={[
          styles.shadow,
          {
            flex: 0.3,
            marginRight: 30,
            marginLeft: 30,
            borderRadius: 60,
            backgroundColor: "white",
            marginBottom: 20,
          },
        ]}
      >
        <View
          style={{
            width: SCREEN_WIDTH - 60,
            height: 175,
          }}
        />
      </View>

      <BottomSheet
        ref={sheetRef}
        enabledInnerScrolling={false}
        snapPoints={[500, 0]}
        borderRadius={60}
        renderContent={renderContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  shadow: {
    shadowColor: theme.lightGrey,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 1,
  },
});
