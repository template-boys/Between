import React, { ReactElement, useState } from "react";
import RNLocation from "react-native-location";
import { PixelRatio, Platform, StyleSheet, Text } from "react-native";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MapView, { Marker, Polyline } from "react-native-maps";
import theme from "../../../themes/theme";
import mapTheme from "./mapTheme";
import { setUserLocation } from "../redux/searchActions";
import { getPolylineArray } from "../utils/directionsUtils";

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
  const searchType = useSelector((state) => state.searchReducer.searchType);

  const searchLoading = useSelector(
    (state) => state.searchReducer.searchLoading
  );

  const currentRouteDirections = useSelector(
    (state) => state.searchReducer.currentRouteDirections
  );
  const region = {
    latitude: userLocation?.latitude || 42.65847,
    longitude: userLocation?.longitude || 21.1607,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };
  const [originMarkers, setOriginMarkers] = useState<any>([]);
  const [destinationMarkers, setDestinationMarkers] = useState<any>([]);

  React.useEffect(() => {
    let markers = searchLocations.map((location) => {
      return {
        latitude: location?.position?.lat,
        longitude: location?.position?.lon,
        description: location?.poi?.name ?? location?.address?.freeformAddress,
        latitudeDelta: 5,
        longitudeDelta: 5,
        pinColor: theme.darkPurple,
      };
    });
    setOriginMarkers(markers);
  }, [searchLocations]);

  React.useEffect(() => {
    let markers = searchResult.map((result) => {
      return {
        latitude: result?.coordinates?.latitude,
        longitude: result?.coordinates?.longitude,
        latitudeDelta: 5,
        longitudeDelta: 5,
        pinColor: theme.secondary,
      };
    });
    setDestinationMarkers(markers);
  }, [searchResult]);

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

  React.useEffect(() => {
    //used if there are 1 or 0 locations set.
    const setToRegion = originMarkers.length === 1 ? originMarkers[0] : region;
    if (searchLocations.length < 2) {
      mapRef.current.animateToRegion({
        ...setToRegion,
        latitudeDelta: 0.4,
        longitudeDelta: 0.4,
      });
      return;
    }

    //used if there are multiple locations set
    console.log("Destination Markers: ", destinationMarkers);
    setTimeout(() => {
      mapRef.current.fitToCoordinates(
        [...destinationMarkers, ...originMarkers],
        {
          animated: true,
          edgePadding: {
            top: Platform.OS === "ios" ? 150 : PixelRatio.get() * 100 - 50,
            right: 100,
            left: 100,
            bottom: Platform.OS === "ios" ? 100 : PixelRatio.get() * 350 - 50,
          },
        }
      );
    }, 250);
    return () => {};
  }, [originMarkers, destinationMarkers, searchType, placeIndex]);

  let polylineArray;

  if (!!currentRouteDirections) {
    polylineArray = getPolylineArray(currentRouteDirections);
  }

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
    >
      {searchLocations.length === 2 && (
        <Polyline
          coordinates={polylineArray}
          strokeWidth={5}
          strokeColor="#02C39A"
          // strokeColors={[theme.darkPurple, theme.secondary]}
          fillColor="#02C39A"
        />
      )}

      {originMarkers.map((marker, i) => (
        <Marker
          key={`${marker?.latitude},${marker?.latitude},${i}`}
          identifier={`id${i}`}
          coordinate={marker}
          description={marker.description}
          pinColor={marker.pinColor}
          style={{ zIndex: 5 }}
          onPress={(e) => {
            e.stopPropagation();
            setPressedMarker(i);
          }}
        ></Marker>
      ))}
      {destinationMarkers.map((marker, i) => {
        const markerStyle =
          placeIndex === i
            ? { zIndex: 10, opacity: 1 }
            : { zIndex: 0, opacity: 0.5, height: 10, width: 10 };
        return (
          <Marker
            key={`${marker?.latitude},${marker?.longitude},${i}`}
            identifier={`id${i}`}
            coordinate={marker}
            description={marker.description}
            pinColor={placeIndex === i ? marker.pinColor : theme.lightGrey}
            style={markerStyle}
            onPress={(e) => {
              e.stopPropagation();
              setPressedMarker(i);
            }}
          ></Marker>
        );
      })}
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
