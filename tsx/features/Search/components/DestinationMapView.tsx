import React, { ReactElement } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import theme from "../../../themes/theme";
import mapTheme from "../../../../assets/mapThemes/mapTheme";

interface Props {
  location: { longitude: number; latitude: number };
  polylineArray?: any[];
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
        {polylineArray && polylineArray?.length > 0 && (
          <>
            <Polyline
              coordinates={polylineArray}
              strokeWidth={5}
              strokeColor="#02C39A"
              // strokeColors={[theme.darkPurple, theme.secondary]}
              fillColor="#02C39A"
            />
            <Marker
              coordinate={{
                longitude: polylineArray[0]?.longitude,
                latitude: polylineArray[0]?.latitude,
              }}
              key={"origin"}
              pinColor={theme.darkPurple}
            ></Marker>
            <Marker
              coordinate={{
                longitude: polylineArray[polylineArray?.length - 1]?.longitude,
                latitude: polylineArray[polylineArray?.length - 1]?.latitude,
              }}
              key={"destination"}
              pinColor={theme.secondary}
            ></Marker>
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
