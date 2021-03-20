import React, { ReactElement, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Carousel from "react-native-snap-carousel";
import Button from "../../components/Button";
import AutoCompleteInputField from "../../components/AutoCompleteInputField";
import { addSearchLocation, setSearchResult } from "../../../testActions";
import { useDispatch, useSelector } from "react-redux";
import style from "../../themes/style";
import theme from "../../themes/theme";
import MapLocationView from "./components/MapView";
import { Input } from "react-native-elements";
import { placeSearch } from "../../api/PlaceSearch";
import { getCenterOfBounds } from "geolib";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface Item {
  elementType?: keyof JSX.IntrinsicElements;
}

export default function SearchScreen({ navigation }: Props): ReactElement {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchLocations = useSelector(
    (state) => state.testReducer.searchLocations
  );

  const setLocation = (location) => {
    dispatch(addSearchLocation(location));
  };

  const handleSearch = async () => {
    setIsLoading(true);
    let middlePoint;
    let locationCoords: any[] = [];
    searchLocations.forEach((location) => {
      locationCoords.push({
        latitude: location.geometry.location.lat,
        longitude: location.geometry.location.lng,
      });
      console.log(locationCoords);
    });

    middlePoint = getCenterOfBounds(locationCoords);
    console.log("MIDDLE", middlePoint);
    const searchResult = await placeSearch(search, "en", middlePoint);
    setIsLoading(false);
    dispatch(setSearchResult(searchResult.data));
    navigation.navigate("Search Screen 2");
  };

  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const showSearchInput = searchLocations.length !== 0;
  const _renderItem = ({ item }) => {
    return (
      <MapLocationView
        diameter={200}
        location={{
          longitude: item.geometry.location.lng,
          latitude: item.geometry.location.lat,
        }}
        showShadow
      />
    );
  };

  return (
    <View style={{ display: "flex" }}>
      <Text
        style={[
          style.title1,
          {
            alignSelf: "center",
            marginTop: 60,
          },
        ]}
      >
        Add Locations
      </Text>
      <AutoCompleteInputField setLocation={setLocation} />
      <View style={{ marginTop: 90 }}>
        <Carousel
          data={searchLocations}
          renderItem={(item) => _renderItem(item)}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={240}
        />
      </View>
      {showSearchInput && (
        <View>
          <Input
            placeholder="What are you looking for?"
            label="Type of place"
            labelStyle={{
              color: theme.charcoalGrey,
              marginBottom: 8,
            }}
            inputStyle={{
              borderColor: theme.lightGrey,
              padding: 10,
              borderBottomWidth: 2,
              color: theme.black,
              paddingTop: 12,
              paddingBottom: 12,
            }}
            placeholderTextColor={theme.lightGrey}
            containerStyle={{
              marginTop: 45,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            onChangeText={(value) => setSearch(value)}
          />
          <Button
            type="primary"
            title="Search"
            disabled={searchLocations.length === 0 || !search}
            onPress={handleSearch}
          />
        </View>
      )}
    </View>
  );
}
