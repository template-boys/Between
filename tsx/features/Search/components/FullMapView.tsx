import React, { ReactElement, useState } from "react";
import RNLocation from "react-native-location";
import { PixelRatio, Platform, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import theme from "../../../themes/theme";
import mapTheme from "../../../../assets/mapThemes/mapTheme";
import { getPolylineArray } from "../../../utils/routeUtils";
import { State } from "../../../../rootReducer";
import { setOriginIndex, setUserLocation } from "../redux/searchActions";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface Props {
  showShadow?: boolean;
  diameter?: number;
  onIconPress?: () => void;
  onRemovePress: (index: number) => void;
  originLocations: any;
  yelpDestinations: any;
  mapHeight: number;
}

export default function FullMapView({
  originLocations,
  yelpDestinations,
  mapHeight,
}: Props): ReactElement {
  const dispatch = useDispatch();
  const mapRef = React.useRef<any | null>(null);

  const destinationIndex = useSelector(
    (state: State) => state.searchReducer.destinationIndex
  );
  const userLocation = useSelector(
    (state: State) => state.searchReducer.userLocation
  );
  const destinationType = useSelector(
    (state: State) => state.searchReducer.destinationType
  );

  const destinationSearchLoading = useSelector(
    (state: State) => state.searchReducer.destinationSearchLoading
  );

  const currentRouteGeometry = useSelector(
    (state: State) => state.searchReducer.currentRouteGeometry
  );

  const selectedOriginIndex = useSelector(
    (state: State) => state.searchReducer.selectedOriginIndex
  );
  const region = {
    latitude: userLocation?.latitude || 39.8283,
    longitude: userLocation?.longitude || -98.5795,
    latitudeDelta: 50,
    longitudeDelta: 50,
  };
  const [originMarkers, setOriginMarkers] = useState<any>([]);
  const [destinationMarkers, setDestinationMarkers] = useState<any>([]);

  React.useEffect(() => {
    let markers = originLocations.map((location) => {
      return {
        latitude: location?.position?.lat,
        longitude: location?.position?.lon,
        description: location?.poi?.name ?? location?.address?.freeformAddress,
        latitudeDelta: 5,
        longitudeDelta: 5,
        pinColor: theme.secondary,
      };
    });
    setOriginMarkers(markers);
  }, [originLocations]);

  React.useEffect(() => {
    let markers = yelpDestinations.map((result) => {
      return {
        latitude: result?.coordinates?.latitude,
        longitude: result?.coordinates?.longitude,
        latitudeDelta: 5,
        longitudeDelta: 5,
        pinColor: theme.darkPurple,
      };
    });
    setDestinationMarkers(markers);
  }, [yelpDestinations]);

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
    if (originLocations.length < 2) {
      mapRef.current.animateToRegion({
        ...setToRegion,
        latitudeDelta: 0.4,
        longitudeDelta: 0.4,
      });
      return;
    }

    //used if there are multiple locations set
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
  }, [
    originMarkers,
    destinationMarkers,
    destinationType,
    destinationIndex,
    mapHeight,
  ]);

  let polylineArray;

  if (!!currentRouteGeometry) {
    polylineArray = getPolylineArray(currentRouteGeometry);
  }

  return (
    <MapView
      ref={mapRef}
      onPress={() => {
        dispatch(setOriginIndex(-1));
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
            dispatch(setOriginIndex(i));
          }}
        />
      ))}
      {destinationMarkers.map((marker, i) => {
        const markerStyle =
          destinationIndex === i
            ? { zIndex: 10, height: 100, width: 100 }
            : { zIndex: 0 };
        return (
          <Marker
            key={`${marker?.latitude},${marker?.longitude},${i} ${marker.description}`}
            identifier={`id${i}`}
            coordinate={marker}
            description={marker.description}
            opacity={destinationIndex === i ? 1 : 0.3}
            pinColor={
              destinationIndex === i ? marker.pinColor : theme.lightGrey
            }
            style={markerStyle}
          />
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapStyles: {
    position: "absolute",
    zIndex: -2,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 1.5,
    flex: 1,
  },
});
