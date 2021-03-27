import React from "react";
import { View, Text, Image, Linking } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import style from "../../themes/style";
import theme from "../../themes/theme";
import MapView from "./components/MapView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getDirections } from "./redux/searchActions";
import polyline from "google-polyline";

interface Props {
  navigation: any;
}

const PlaceDetailsScreen = (props: Props) => {
  const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.searchReducer.searchResult);
  const placeIndex = useSelector((state) => state.searchReducer.placeIndex);
  const currentRouteDirections = useSelector(
    (state) => state.searchReducer.currentRouteDirections
  );
  const searchLocations = useSelector(
    (state) => state.searchReducer.searchLocations
  );
  const place = searchResult?.results[placeIndex] ?? null;
  const latitude = place?.geometry?.location?.lat;
  const longitude = place?.geometry?.location?.lng;

  //Get what icon name the Math.floor(rating) should be
  const getHalfStarIndex = () => {
    const placeRating = place?.rating;
    let result = "";
    if (placeRating % 1 >= 0.28 && placeRating % 1 < 0.78) {
      result = "star-half";
    } else if (placeRating % 1 >= 0.78 || placeRating % 1 === 0) {
      result = "star";
    } else {
      result = "star-outline";
    }
    return result;
  };

  const getStars = [1, 2, 3, 4, 5].map((item, key) => {
    const floorResult = getHalfStarIndex();
    let name = "star";
    if (Math.ceil(place?.rating) === item) {
      name = floorResult;
    } else if (item > place?.rating) {
      name = "star-outline";
    }
    return (
      <Icon
        style={{ alignSelf: "center" }}
        name={name}
        size={20}
        color={theme.darkPurple}
      />
    );
  });

  //dynamic in the future (whatever location user wants to see from)
  const pickup = {
    latitude: searchLocations[0]?.geometry?.location?.lat,
    longitude: searchLocations[0]?.geometry?.location?.lng,
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
        searchLocations[0].formatted_address,
        place?.formatted_address
      )
    );
  }, []);

  let polylineArray: any[] = [];
  if (currentRouteDirections?.length > 0) {
    const decoded = polyline.decode(currentRouteDirections);
    decoded.forEach((location) => {
      polylineArray.push({ latitude: location[0], longitude: location[1] });
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <MapView
        location={{ latitude, longitude }}
        polylineArray={polylineArray}
      />
      <View style={{ alignItems: "flex-start", marginLeft: 18 }}>
        <View style={{ flexDirection: "row", marginTop: 4 }}>
          {getStars}
          <Text
            style={{ fontWeight: "200", fontSize: 12, paddingTop: 4 }}
          >{`(${place?.user_ratings_total} reviews)`}</Text>
        </View>
        <Text style={[style.title1, { marginTop: 10 }]}>{place?.name}</Text>
        <Text style={{ fontWeight: "200" }}>{place?.formatted_address}</Text>
        <Text style={{ fontWeight: "200" }}>
          {place?.formatted_phone_number}
        </Text>
        {!place?.open_now && (
          <Text style={[style.body4, { color: "green", marginTop: 4 }]}>
            Open now
          </Text>
        )}

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(lyftURL).catch((err) =>
                console.error("Couldn't load page", err)
              );
            }}
          >
            <Image
              source={require("./static/lyft.png")}
              style={{ width: 60, height: 60 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PlaceDetailsScreen;
