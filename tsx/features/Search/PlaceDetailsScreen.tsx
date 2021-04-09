import React, { useRef, useState } from "react";
import { View, Text, Image, Linking, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import style from "../../themes/style";
import MapView from "./components/MapView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getDirections } from "./redux/searchActions";
import { getPolylineArray } from "./utils/directionsUtils";
import { getRatingImage } from "./utils/searchUtils";
import Carousel from "react-native-snap-carousel";
import theme from "../../themes/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface Props {
  navigation: any;
}

const PlaceDetailsScreen = (props: Props) => {
  const carouselRef = useRef<any | null>(null);
  const dispatch = useDispatch();
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const searchResult = useSelector((state) => state.searchReducer.searchResult);
  const placeIndex = useSelector((state) => state.searchReducer.placeIndex);
  const currentRouteDirections = useSelector(
    (state) => state.searchReducer.currentRouteDirections
  );
  const searchLocations = useSelector(
    (state) => state.searchReducer.searchLocations
  );
  const place = searchResult?.businesses[placeIndex] ?? null;
  const latitude = place?.coordinates?.latitude;
  const longitude = place?.coordinates?.longitude;

  //dynamic in the future (whatever location user wants to see from)
  const pickup = {
    latitude: searchLocations[selectedLocationIndex]?.position?.lat,
    longitude: searchLocations[selectedLocationIndex]?.position?.lon,
  };

  const lyftURL = `https://lyft.com/ride?id=lyft&pickup[latitude]=${pickup.latitude}&pickup[longitude]=${pickup.longitude}&destination[latitude]=${latitude}&destination[longitude]=${longitude}&partner=lL5keX91WP4D`;

  //Whenever component mounts, get directions from first location to our place
  //In the future I want this to be the users location if they used their location
  //And allow user to change where they want to see location from
  React.useEffect(() => {
    props.navigation.setOptions({
      title: place?.name || "Details",
    });

    dispatch(
      getDirections(
        {
          longitude: searchLocations[selectedLocationIndex]?.position?.lon,
          latitude: searchLocations[selectedLocationIndex]?.position?.lat,
        },
        {
          longitude: place?.coordinates?.longitude,
          latitude: place?.coordinates?.latitude,
        }
      )
    );
  }, []);

  const imageSource = getRatingImage(place?.rating);

  let polylineArray: any[] = [];

  if (!!currentRouteDirections) {
    polylineArray = getPolylineArray(currentRouteDirections);
  }

  const _renderSearchLocation = ({ item, index }) => {
    return (
      <View
        style={{
          margin: 4,
          borderRadius: 26,
          padding: 10,
          alignItems: "center",
          shadowColor: theme.lightGrey,
          shadowOffset: { width: 3, height: 3 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 1,
          backgroundColor: theme.lightestGrey,
        }}
      >
        <Text style={{ fontWeight: "400", textAlign: "center" }}>
          {item?.poi?.name ?? item?.address?.freeformAddress}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <MapView
        location={{ latitude, longitude }}
        polylineArray={polylineArray}
      />
      <Text
        style={{ fontWeight: "300", alignSelf: "center", marginBottom: 15 }}
      >
        Show Directions to {place?.name} from:
      </Text>
      <Carousel
        containerCustomStyle={{ flexGrow: 0 }}
        ref={carouselRef}
        data={searchLocations}
        renderItem={_renderSearchLocation}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH / 1.4}
        removeClippedSubviews={false}
        onSnapToItem={(index) => {
          setSelectedLocationIndex(index);
          dispatch(
            getDirections(
              {
                longitude: searchLocations[index]?.position?.lon,
                latitude: searchLocations[index]?.position?.lat,
              },
              {
                longitude: place?.coordinates?.longitude,
                latitude: place?.coordinates?.latitude,
              }
            )
          );
        }}
      />

      <View style={{ alignItems: "flex-start", marginLeft: 18 }}>
        <View
          style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}
        >
          <Image source={imageSource} />
          <Text
            style={{
              fontWeight: "200",
              fontSize: 12,
              paddingTop: 4,
              marginLeft: 5,
            }}
          >{`(${place?.review_count} reviews)`}</Text>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL(lyftURL).catch((err) =>
                console.error("Couldn't load page", err)
              );
            }}
          >
            <Image
              source={require("./static/lyft.png")}
              style={{ width: 45, height: 45 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(place?.url).catch((err) =>
                console.error("Couldn't load page", err)
              );
            }}
          >
            <Icon name="yelp" size={35} color={"#d32323"} />
          </TouchableOpacity>
        </View>
        <Text style={[style.title1, { marginTop: 6 }]}>{place?.name}</Text>
        <Text style={{ fontWeight: "200" }}>
          {place?.location?.display_address[0]}
        </Text>
        <Text style={{ fontWeight: "200" }}>
          {place?.location?.display_address[1]}
        </Text>

        <Text style={{ fontWeight: "200" }}>{place?.display_phone}</Text>
        {!place?.open_now && (
          <Text style={[style.body4, { color: "green", marginTop: 4 }]}>
            Open now
          </Text>
        )}
      </View>
    </View>
  );
};

export default PlaceDetailsScreen;
