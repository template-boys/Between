import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import theme from "../../../themes/theme";

interface Props {
  location: { longitude: number; latitude: number };
  showShadow: boolean;
  diameter: number;
}

export default function MapLocationView({
  diameter,
  location,
}: Props): ReactElement {
  return (
    <View style={styles.container}>
      <MapView
        style={[
          styles.mapStyles,
          {
            height: diameter,
            width: diameter,
            borderRadius: diameter / 2,
          },
        ]}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        mapType="satellite"
        pitchEnabled={false}
        rotateEnabled={false}
        zoomEnabled={false}
        scrollEnabled={false}
      >
        {/* <Marker coordinate={location} /> */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: theme.lightGrey,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 7,
    elevation: 1,
    alignSelf: "center",
  },
  mapStyles: {
    zIndex: -10,
    borderWidth: 4,
    borderColor: theme.purple,
  },
});
