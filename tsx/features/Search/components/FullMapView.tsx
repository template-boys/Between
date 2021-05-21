import React, { ReactElement, useState } from "react";
import RNLocation from "react-native-location";
import { PixelRatio, Platform, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import theme from "../../../themes/theme";
import mapTheme from "../../../../assets/mapThemes/mapTheme";
import { State } from "../../../../rootReducer";
import {
  setDestinationIndex,
  setOriginIndex,
  setUserLocation,
} from "../redux/searchActions";

interface Props {
  showShadow?: boolean;
  diameter?: number;
  onIconPress?: () => void;
  onRemovePress: (index: number) => void;
  originLocations: any;
  yelpDestinations: any;
}

export default function FullMapView({
  originLocations,
  yelpDestinations,
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
            top:
              Platform.OS === "ios"
                ? 150
                : PixelRatio.getPixelSizeForLayoutSize(150),
            right: 100,
            left: 100,
            bottom:
              Platform.OS === "ios"
                ? 35
                : PixelRatio.getPixelSizeForLayoutSize(35),
          },
        }
      );
    }, 250);
    return () => {};
  }, [originMarkers, destinationMarkers, destinationType, destinationIndex]);

  return (
    <MapView
      ref={mapRef}
      onPress={() => {
        dispatch(setOriginIndex(-1));
      }}
      style={styles.mapStyles}
      initialRegion={region}
      provider={"google"}
      customMapStyle={mapTheme}
      showsUserLocation
      showsMyLocationButton
      mapPadding={{
        top: 0,
        right: 0,
        bottom: destinationMarkers.length > 2 ? 275 : 0,
        left: 0,
      }}
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
            onPress={() => {
              dispatch(setDestinationIndex(i));
            }}
            style={markerStyle}
          />
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapStyles: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
});
