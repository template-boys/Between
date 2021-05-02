import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Linking,
  Dimensions,
  FlatList,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import style from "../../themes/style";
import DestinationMapView from "./components/DestinationMapView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getDirections } from "./redux/searchActions";
import { getPolylineArray } from "../../utils/directionsUtils";
import { getRatingImage } from "../../utils/searchUtils";
import theme from "../../themes/theme";
import Icon from "react-native-vector-icons/Ionicons";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { State } from "../../../rootReducer";
import { TomTomOriginResult } from "./redux/searchReducerTypes";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface Props {
  navigation: any;
}

const DestinationDetailsScreen = (props: Props) => {
  const carouselRef = useRef<any | null>(null);
  const dispatch = useDispatch();
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const searchResult = useSelector(
    (state: State) => state.searchReducer.searchResult
  );
  const placeIndex = useSelector(
    (state: State) => state.searchReducer.placeIndex
  );
  const currentRouteGeometry = useSelector(
    (state: State) => state.searchReducer.currentRouteGeometry
  );
  const originLocations = useSelector(
    (state: State) => state.searchReducer.originLocations
  );
  const place = searchResult?.businesses[placeIndex] ?? null;
  const latitude = place?.coordinates?.latitude;
  const longitude = place?.coordinates?.longitude;

  //dynamic in the future (whatever location user wants to see from)
  const pickup = {
    latitude: originLocations[selectedLocationIndex]?.position?.lat,
    longitude: originLocations[selectedLocationIndex]?.position?.lon,
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
          longitude: originLocations[selectedLocationIndex]?.position?.lon,
          latitude: originLocations[selectedLocationIndex]?.position?.lat,
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

  if (!!currentRouteGeometry) {
    polylineArray = getPolylineArray(currentRouteGeometry);
  }

  const _renderOriginLocation = ({ item, index }) => {
    return (
      <View style={styles.originLocationContainer}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
          }}
        >
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Text style={[style.semiBold, { marginBottom: 10 }]}>
              Origin {index + 1}
            </Text>
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
              <Icon
                name="location-outline"
                size={18}
                color={theme.darkPurple}
                style={{ paddingRight: 5 }}
              />
              <Text
                numberOfLines={2}
                style={[
                  style.light,
                  {
                    fontSize: 13,
                  },
                ]}
              >
                {item?.poi?.name ?? item?.address?.freeformAddress}
              </Text>
            </View>
          </View>
          <Icon name={"checkmark-circle"} size={30} color={theme.darkPurple} />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DestinationMapView
        location={{ latitude, longitude }}
        polylineArray={polylineArray}
      />

      {/* Origins */}
      <View style={styles.originDivider} />
      <FlatList
        data={originLocations}
        renderItem={_renderOriginLocation}
        style={{ maxHeight: 250, backgroundColor: "white" }}
      />
      <View style={styles.originDivider} />

      {/* Reviews */}
      <View
        style={{
          alignItems: "flex-start",
          marginHorizontal: 20,
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Text style={[style.semiBold, { paddingRight: 20 }]}>Reviews</Text>
          <View style={styles.divider} />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Image source={imageSource} />
          <View style={{ justifyContent: "center" }}>
            <Text
              style={[
                style.semiBold,
                {
                  paddingHorizontal: 10,
                  lineHeight: 30,
                },
              ]}
            >
              {place?.rating.toFixed(1)}
            </Text>
          </View>

          <Text
            style={{
              fontWeight: "200",
              fontSize: 14,
            }}
          >{`(${place?.review_count} reviews)`}</Text>
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={() => {
              Linking.openURL(place?.url).catch((err) =>
                console.error("Couldn't load page", err)
              );
            }}
          >
            <FAIcon name="yelp" size={35} color={"#d32323"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(lyftURL).catch((err) =>
                console.error("Couldn't load page", err)
              );
            }}
          >
            <Image
              source={require("../../../assets/static/lyft.png")}
              style={{ width: 45, height: 45 }}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 6 }}>{place?.name}</Text>
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
const styles = StyleSheet.create({
  originLocationContainer: {
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 100,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 1,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e3e3e3",
  },
  originDivider: {
    borderColor: "#e3e3e3",
    borderWidth: 1,
  },
  divider: {
    borderColor: "#e3e3e3",
    borderWidth: 1,
    flex: 1,
  },
});

export default DestinationDetailsScreen;
