import React, { ReactElement } from "react";
import RNLocation from "react-native-location";
import { PixelRatio, Platform, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import theme from "../../../themes/theme";
import mapTheme from "./mapTheme";
import { setUserLocation } from "../redux/searchActions";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface Props {
  showShadow?: boolean;
  diameter?: number;
  onIconPress?: () => void;
  onRemovePress: (index: number) => void;
  searchLocations: any;
  searchResult: any;
  mapHeight: number;
}

export default function FullMapView({
  searchLocations,
  searchResult,
  mapHeight,
}: Props): ReactElement {
  const dispatch = useDispatch();
  const [pressedMarker, setPressedMarker] = React.useState(-1);
  const mapRef = React.useRef<any | null>(null);
  const placeMarker = React.useRef<any | null>(null);

  const placeIndex = useSelector((state) => state.searchReducer.placeIndex);
  const userLocation = useSelector((state) => state.searchReducer.userLocation);

  const searchLoading = useSelector(
    (state) => state.searchReducer.searchLoading
  );

  const region = {
    latitude: userLocation?.latitude || 42.65847,
    longitude: userLocation?.longitude || 21.1607,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  let markers: any[] = [];

  React.useEffect(() => {
    //used if there are 1 or 0 locations set.
    const setToRegion = markers.length === 1 ? markers[0] : region;
    if (markers.length < 2) {
      mapRef.current.animateToRegion({
        ...setToRegion,
        latitudeDelta: 0.4,
        longitudeDelta: 0.4,
      });
      return;
    }

    //used if there are multiple locations set
    mapRef.current.fitToCoordinates(markers, {
      animated: true,
      edgePadding: {
        top: Platform.OS === "ios" ? 200 : PixelRatio.get() * 100 - 50,
        right: 100,
        left: 100,
        bottom: Platform.OS === "ios" ? 200 : PixelRatio.get() * 350 - 50,
      },
    });
    return () => {};
  }, [searchLocations]);

  searchLocations.forEach((location) => {
    markers.push({
      latitude: location?.position?.lat,
      longitude: location?.position?.lon,
      description: location?.poi?.name ?? location?.address?.freeformAddress,
      latitudeDelta: 5,
      longitudeDelta: 5,
      pinColor: theme.darkPurple,
    });
  });

  const showPlaceMarker =
    searchResult[placeIndex]?.coordinates &&
    !searchLoading &&
    searchLocations.length > 1;

  React.useEffect(() => {
    const getLocationPermission = async () => {
      const permission = await RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "coarse",
          rationale: {
            title: "We need to access your location",
            message: "We use your location to show where you are on the map",
            buttonPositive: "OK",
            buttonNegative: "Cancel",
          },
        },
      });
      if (permission) {
        const location = await RNLocation.getLatestLocation({ timeout: 100 });
        dispatch(setUserLocation(location));
      }
    };
    getLocationPermission();
  }, []);

  React.useEffect(() => {
    if (!!userLocation?.longitude && !!userLocation?.latitude) {
      mapRef.current?.animateToRegion({
        ...userLocation,
        latitudeDelta: 1,
        longitudeDelta: 1,
      });
    }
  }, [userLocation]);

  return (
    <MapView
      ref={mapRef}
      onPress={() => {
        setPressedMarker(-1);
      }}
      style={[
        styles.mapStyles,
        {
          height: mapHeight,
        },
      ]}
      initialRegion={region}
      provider={"google"}
      customMapStyle={mapTheme}
      // pitchEnabled={false}
      // rotateEnabled={false}
      // zoomEnabled={false}
      // scrollEnabled={false}
    >
      {markers.map((marker, i) => (
        <Marker
          key={marker?.latitude}
          identifier={`id${i}`}
          coordinate={marker}
          description={marker.description}
          pinColor={pressedMarker === i ? theme.errorRed : theme.darkPurple}
          onPress={(e) => {
            e.stopPropagation();
            setPressedMarker(i);
          }}
        ></Marker>
      ))}
      {showPlaceMarker && (
        <Marker
          description={searchResult[placeIndex]?.name}
          coordinate={searchResult[placeIndex]?.coordinates}
          key={searchResult[placeIndex]?.name}
          pinColor={theme.blue}
        ></Marker>
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapStyles: {
    position: "absolute",
    zIndex: -10,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 1.5,
    flex: 1,
  },
});
