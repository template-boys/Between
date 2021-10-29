import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Linking,
  StyleSheet,
  Platform,
  Share,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import style from "../../themes/style";
import DestinationMapView from "./components/DestinationMapView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getBusinessDetails, getRouteGeometries } from "./redux/searchActions";
import { getRatingImage } from "../../utils/searchUtils";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { getPolylineArrays, getRouteDurations } from "./redux/searchSelector";
import { State } from "../../../rootReducer";
import OriginListItem from "./components/OriginListItem";
import { TomTomOriginResult } from "./redux/searchReducerTypes";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import theme from "../../themes/theme";
import { useNavigation } from "@react-navigation/core";
const betweenIcon = require("../../../assets/static/betweenIcon.png");

interface Props {
  navigation: any;
}

const DestinationDetailsScreen = (props: Props) => {
  const dispatch = useDispatch();
  const [selectedOriginIndex, setSelectedOriginIndex] = useState(0);
  const destinations = useSelector(
    (state: State) => state.searchReducer.destinations ?? []
  );
  const destinationIndex = useSelector(
    (state: State) => state.searchReducer.destinationIndex
  );
  const businessDetails = useSelector(
    (state: State) => state.searchReducer.businessDetails ?? {}
  );
  const origins = useSelector((state: State) => state.searchReducer.origins);
  const polylineArrays = useSelector(getPolylineArrays);
  const duration = useSelector(getRouteDurations);
  console.log(duration);

  const selectedDestination = destinations[destinationIndex];
  const latitude = selectedDestination?.coordinates?.latitude;
  const longitude = selectedDestination?.coordinates?.longitude;

  //dynamic in the future (whatever location user wants to see from)
  const pickup = {
    latitude: origins[selectedOriginIndex]?.position?.lat,
    longitude: origins[selectedOriginIndex]?.position?.lon,
  };

  const lyftURL = `https://lyft.com/ride?id=lyft&pickup[latitude]=${pickup.latitude}&pickup[longitude]=${pickup.longitude}&destination[latitude]=${latitude}&destination[longitude]=${longitude}&partner=lL5keX91WP4D`;

  /*
    Iterate through all origins and get directions to destination
  */
  React.useEffect(() => {
    // Enable API call for yelp business details
    // dispatch(getBusinessDetails(selectedDestination.id));
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

  // React.useEffect(() => {
  //   console.log()
  //   if (businessDetails.id !== selectedDestination.id) {
  //     props.navigation.navigate("In Between");
  //   }
  // }, [businessDetails]);

  const imageSource = getRatingImage(selectedDestination?.rating);

  const _renderOriginLocation: React.FC<{
    item: TomTomOriginResult;
    index: number;
  }> = ({ item, index }) => {
    const isSelected = selectedOriginIndex === index;
    return <OriginListItem origin={item} />;
  };

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  const latLng = `${selectedDestination.coordinates.latitude},${selectedDestination.coordinates.longitude}`;
  const label = selectedDestination.name;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundDark }}>
      <View
        style={{
          position: "absolute",
          marginTop: insets.top,
          marginLeft: 15,
          zIndex: 100,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="chevron-back-outline" size={40} color={"white"} />
        </TouchableOpacity>
      </View>
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
          flex: 1,
          backgroundColor: theme.darkestGrey,
          // borderTopRightRadius: 150,
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
            marginHorizontal: 20,
          }}
        >
          <View style={{ flexDirection: "row", marginTop: 25 }}>
            <Image
              source={
                !!selectedDestination.image_url
                  ? { uri: selectedDestination?.image_url }
                  : betweenIcon
              }
              style={{ width: 125, height: 125, borderRadius: 20 }}
            />
            <View
              style={{
                marginHorizontal: 15,
                alignContent: "center",
                flexShrink: 1,
              }}
            >
              <Text style={[style.bold, { fontSize: 20, color: "white" }]}>
                {selectedDestination?.name}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(url as string);
                }}
              >
                <Text
                  style={{
                    fontWeight: "200",
                    marginTop: 4,
                    color: theme.lighterGrey,
                  }}
                >
                  {selectedDestination?.location?.display_address[0] ?? ""}
                </Text>
                <Text style={{ fontWeight: "200", color: theme.lighterGrey }}>
                  {selectedDestination?.location?.display_address[1] ?? ""}
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  fontWeight: "200",
                  color: theme.lighterGrey,
                  marginTop: 5,
                }}
                onPress={() => {
                  Linking.openURL(`tel:${selectedDestination.phone}`);
                }}
              >
                {selectedDestination?.display_phone}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 15,
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
                    color: theme.lightGrey,
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
                color: theme.lightGrey,
              }}
            >{`(${selectedDestination?.review_count} reviews)`}</Text>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 15,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontWeight: "200",
                textAlign: "center",
                fontSize: 18,
                color: theme.lighterGrey,
              }}
            >
              <Text>{`Average time to ${selectedDestination?.name}\nis`}</Text>
              <Text
                style={{
                  color: "white",
                  fontStyle: "italic",
                  fontWeight: "400",
                }}
              >{` ${duration} `}</Text>
              <Text>{`from ${origins.length} locations.`}</Text>
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: 35,
          }}
        >
          <View
            style={{
              marginTop: 35,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                marginLeft: 25,
              }}
            >
              <Text
                style={[
                  style.semiBold,
                  { paddingRight: 20, color: "white", fontSize: 18 },
                ]}
              >
                Connect
              </Text>
              <View style={styles.divider} />
            </View>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              marginTop: 15,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${selectedDestination.phone}`);
              }}
            >
              <Icon name="call-outline" size={25} color={theme.lightestGrey} />
            </TouchableOpacity>
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
              <FAIcon name="yelp" size={30} color={"#d32323"} />
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
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await Share.share({
                  url: selectedDestination.url,
                });
              }}
            >
              <Icon name="share-outline" size={25} color={theme.lightestGrey} />
            </TouchableOpacity>
          </View>
        </View>
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
    borderWidth: 0.5,
    flex: 1,
  },
});

export default DestinationDetailsScreen;
