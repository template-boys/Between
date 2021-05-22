import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Linking,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import style from "../../themes/style";
import DestinationMapView from "./components/DestinationMapView";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  getDestinationDetails,
  getRouteGeometries,
} from "./redux/searchActions";
import { getRatingImage } from "../../utils/searchUtils";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { getPolylineArrays } from "./redux/searchSelector";
import { State } from "../../../rootReducer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import theme from "../../themes/theme";
import { useNavigation } from "@react-navigation/core";
import Button from "../../components/Button";
import { ScreenWidth } from "react-native-elements/dist/helpers";
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
  const origins = useSelector((state: State) => state.searchReducer.origins);
  const selectedDestinationDetails = useSelector(
    (state: State) => state.searchReducer.selectedDestinationDetails
  );

  selectedDestinationDetails;
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
    dispatch(getDestinationDetails(selectedDestination.id));
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

  const dayArr = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const offsetDayArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const tConv24 = (time24) => {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = H % 12 || 12;
    h = h < 10 ? "0" + h : h; // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  };

  const _renderOpeningHours = () => {
    if (
      selectedDestinationDetails?.hours &&
      selectedDestinationDetails?.hours[0]?.open
    ) {
      return selectedDestinationDetails.hours[0].open.map((day) => {
        const isCurrentDayOfWeek =
          offsetDayArr[new Date().getDay()] === dayArr[day.day];
        return (
          <Text
            style={[
              style.regular,
              { fontWeight: isCurrentDayOfWeek ? "800" : "500" },
            ]}
          >
            {dayArr[day.day]} {tConv24(day.start)} - {tConv24(day.end)}
          </Text>
        );
      });
    } else {
      return null;
    }
  };

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "white" }}>
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
            style={{
              width: 40,
              height: 40,
              borderRadius: 25,
              backgroundColor: "white",
              shadowColor: "black",
              shadowOpacity: 0.3,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 0 },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              name="chevron-back-outline"
              size={25}
              color={theme.darkPurple}
            />
          </TouchableOpacity>
        </View>
        {!!latitude && !!longitude && (
          <DestinationMapView
            location={{ latitude, longitude }}
            polylineArrays={polylineArrays}
          />
        )}
        <ScrollView
          contentContainerStyle={{
            alignItems: "flex-start",
            marginHorizontal: 20,
            marginTop: 15,
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={[
              style.semiBold,
              { paddingRight: 10, fontSize: 25, lineHeight: 30 },
            ]}
          >
            {selectedDestination?.name ?? ""}{" "}
          </Text>
          {selectedDestinationDetails?.hours && (
            <Text
              style={[
                style.regular,
                {
                  color: selectedDestinationDetails?.hours[0]?.is_open_now
                    ? "green"
                    : "red",
                },
              ]}
            >
              {selectedDestinationDetails?.hours[0]?.is_open_now
                ? "Open Now"
                : "Closed Now"}
            </Text>
          )}
          {_renderOpeningHours()}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <View style={styles.divider} />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              marginTop: 7,
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
              style={[
                style.regular,
                {
                  fontSize: 14,
                },
              ]}
            >{`(${selectedDestination?.review_count ?? ""} reviews)`}</Text>

            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
            <TouchableOpacity
              style={{ marginLeft: 10 }}
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
          </View>
          <Text style={[style.regular]}>
            {selectedDestination?.location?.display_address[0] ?? ""}
          </Text>
          <Text style={style.regular}>
            {selectedDestination?.location?.display_address[1] ?? ""}
          </Text>

          <Text style={style.regular}>
            {selectedDestination?.display_phone}
          </Text>
        </ScrollView>
      </View>
      <View
        style={{
          paddingLeft: 30,
          paddingRight: 30,
          position: "absolute",
          zIndex: 100,
          bottom: 7,
          width: ScreenWidth,
        }}
      >
        <Button
          title="See Route Details"
          onPress={() => {}}
          buttonStyle={{
            margin: 30,
            shadowColor: "black",
            shadowOpacity: 0.15,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 0 },
          }}
          type="primary"
        />
      </View>
    </>
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
