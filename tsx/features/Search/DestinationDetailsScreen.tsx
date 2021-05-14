import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Linking,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import style from "../../themes/style";
import DestinationMapView from "./components/DestinationMapView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getRouteGeometries } from "./redux/searchActions";
import { getRatingImage } from "../../utils/searchUtils";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { getPolylineArrays } from "./redux/searchSelector";
import { State } from "../../../rootReducer";
import OriginListItem from "./components/OriginListItem";
import { TomTomOriginResult } from "./redux/searchReducerTypes";
interface Props {
  navigation: any;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const DestinationDetailsScreen = (props: Props) => {
  const dispatch = useDispatch();
  const carouselRef = useRef<any | null>(null);
  const [selectedOriginIndex, setSelectedOriginIndex] = useState(0);
  const destinations = useSelector(
    (state: State) => state.searchReducer.destinations ?? []
  );
  const destinationIndex = useSelector(
    (state: State) => state.searchReducer.destinationIndex
  );
  const origins = useSelector((state: State) => state.searchReducer.origins);
  const polylineArrays = useSelector(getPolylineArrays);
  const selectedDestination = destinations[destinationIndex];
  const latitude = selectedDestination?.coordinates?.latitude;
  const longitude = selectedDestination?.coordinates?.longitude;

  //dynamic in the future (whatever location user wants to see from)
  const pickup = {
    latitude: origins[selectedOriginIndex]?.position?.lat,
    longitude: origins[selectedOriginIndex]?.position?.lon,
  };

  const lyftURL = `https://lyft.com/ride?id=lyft&pickup[latitude]=${pickup.latitude}&pickup[longitude]=${pickup.longitude}&destination[latitude]=${latitude}&destination[longitude]=${longitude}&partner=lL5keX91WP4D`;

  //Whenever component mounts, get directions from first location to our place
  //In the future I want this to be the users location if they used their location
  //And allow user to change where they want to see location from
  React.useEffect(() => {
    props.navigation.setOptions({
      title: selectedDestination?.name || "Details",
    });

    origins.forEach((origin) => {
      dispatch(
        getRouteGeometries(
          {
            longitude: origin?.position?.lon,
            latitude: origin?.position?.lat,
          },
          {
            longitude: selectedDestination?.coordinates?.longitude,
            latitude: selectedDestination?.coordinates?.latitude,
          }
        )
      );
    });
  }, []);

  const imageSource = getRatingImage(selectedDestination?.rating);

  const _renderOriginLocation: React.FC<{
    item: TomTomOriginResult;
    index: number;
  }> = ({ item, index }) => {
    const isSelected = selectedOriginIndex === index;
    return <OriginListItem origin={item} />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {!!latitude && !!longitude && (
        <DestinationMapView
          location={{ latitude, longitude }}
          polylineArrays={polylineArrays}
        />
      )}
      {/* Origins */}
      {/* <View style={{ marginTop: 15 }}>
        <Carousel
          ref={carouselRef}
          data={origins}
          renderItem={_renderOriginLocation}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={300}
          removeClippedSubviews={false}
          containerCustomStyle={{
            height: 120,
          }}
          contentContainerStyle={{ justifyContent: "center" }}
          onBeforeSnapToItem={(i) => {
            dispatch(
              getRouteGeometries(
                {
                  longitude: origins[i]?.position?.lon,
                  latitude: origins[i]?.position?.lat,
                },
                {
                  longitude: selectedDestination?.coordinates?.longitude,
                  latitude: selectedDestination?.coordinates?.latitude,
                }
              )
            );
            setSelectedOriginIndex(i);
          }}
        />
      </View> */}

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
              {selectedDestination?.rating.toFixed(1)}
            </Text>
          </View>

          <Text
            style={{
              fontWeight: "200",
              fontSize: 14,
            }}
          >{`(${selectedDestination?.review_count} reviews)`}</Text>
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={() => {
              {
                if (!!selectedDestination?.url) {
                  Linking.openURL(selectedDestination.url).catch((err) =>
                    console.error("Couldn't load page", err)
                  );
                }
              }
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
        <Text style={{ marginTop: 6 }}>{selectedDestination?.name}</Text>
        <Text style={{ fontWeight: "200" }}>
          {selectedDestination?.location?.display_address[0] ?? ""}
        </Text>
        <Text style={{ fontWeight: "200" }}>
          {selectedDestination?.location?.display_address[1] ?? ""}
        </Text>

        <Text style={{ fontWeight: "200" }}>
          {selectedDestination?.display_phone}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
