import React from "react";
import { View, Text, Image, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import style from "../../themes/style";
import MapView from "./components/MapView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getDirections } from "./redux/searchActions";
import polyline from "google-polyline";

const one = require("./static/1.png");
const oneHalf = require("./static/1.5.png");
const two = require("./static/2.png");
const twoHalf = require("./static/2.5.png");
const three = require("./static/3.png");
const threeHalf = require("./static/3.5.png");
const four = require("./static/4.png");
const fourHalf = require("./static/4.5.png");
const five = require("./static/5.png");

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
  const place = searchResult?.businesses[placeIndex] ?? null;
  const latitude = place?.coordinates?.latitude;
  const longitude = place?.coordinates?.longitude;

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
        `${place?.location?.display_address[0]} ${place?.location?.display_address[1]}`
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

  const rating = place?.rating;
  let imageSource;
  if (rating === 1) {
    imageSource = one;
  } else if (rating === 1.5) {
    imageSource = oneHalf;
  } else if (rating === 2) {
    imageSource = two;
  } else if (rating === 2.5) {
    imageSource = twoHalf;
  } else if (rating === 3) {
    imageSource = three;
  } else if (rating === 3.5) {
    imageSource = threeHalf;
  } else if (rating === 4) {
    imageSource = four;
  } else if (rating === 4.5) {
    imageSource = fourHalf;
  } else {
    imageSource = five;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <MapView
        location={{ latitude, longitude }}
        polylineArray={polylineArray}
      />
      <View style={{ alignItems: "flex-start", marginLeft: 18 }}>
        <Text style={{ fontWeight: "600" }}>
          Directions from:{" "}
          <Text style={{ fontWeight: "200" }}>
            {searchLocations[0]?.formatted_address}
          </Text>
        </Text>
        <View
          style={{ flexDirection: "row", marginTop: 0, alignItems: "center" }}
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
