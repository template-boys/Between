import React, { ReactElement } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import theme from "../../../themes/theme";
import mapTheme from "../../../../assets/mapThemes/mapTheme";
import { Coordinate } from "../redux/searchReducerTypes";

interface Props {
  location: { longitude: number; latitude: number };
  polylineArray: Coordinate[];
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function MapLocationView({
  location,
  polylineArray,
}: Props): ReactElement {
  const mapRef = React.useRef<any | null>(null);

  //Zoom map to show all coordinate of directions array when they change
  React.useEffect(() => {
    //This timeout is needed for the animation to actually occur
    setTimeout(() => {
      mapRef.current?.fitToCoordinates(polylineArray, {
        animated: true,
        edgePadding: {
          top: 70,
          right: 30,
          left: 30,
          bottom: 70,
        },
      });
    }, 250);
  }, [polylineArray]);

  const shouldShowPolyLines = polylineArray.length > 0;

  return (
    <View
      style={{
        backgroundColor: "white",
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,
      }}
    >
      <MapView
        ref={mapRef}
        style={styles.mapStyles}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        provider={"google"}
        customMapStyle={mapTheme}
        pitchEnabled={false}
        rotateEnabled={false}
        zoomEnabled={false}
        scrollEnabled={false}
      >
        {shouldShowPolyLines && (
          <>
            <Polyline
              coordinates={polylineArray}
              strokeWidth={5}
              strokeColors={[theme.secondary, theme.darkPurple]}
            />
            <Marker
              coordinate={{
                longitude: polylineArray[0]?.longitude,
                latitude: polylineArray[0]?.latitude,
              }}
              key={"origin"}
              pinColor={theme.secondary}
            />

            <Marker
              coordinate={{
                longitude: polylineArray[polylineArray?.length - 1]?.longitude,
                latitude: polylineArray[polylineArray?.length - 1]?.latitude,
              }}
              key={"destination"}
              pinColor={theme.darkPurple}
            />
          </>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapStyles: {
    zIndex: -10,
    height: SCREEN_HEIGHT / 3,
    width: SCREEN_WIDTH,
  },
});
