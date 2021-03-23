import React, { ReactElement } from "react";
import { PixelRatio, Platform, StyleSheet } from "react-native";
import { View, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Circle, Marker, Polyline } from "react-native-maps";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import theme from "../../../themes/theme";
import mapTheme from "./mapStyle";
import { getCenterOfBounds } from "geolib";

interface Props {
  showShadow?: boolean;
  diameter?: number;
  onIconPress?: () => void;
}

export default function FullMapView({ onIconPress }: Props): ReactElement {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get(
    "window"
  );

  const searchLocations = useSelector(
    (state) => state.testReducer.searchLocations
  );

  //hardcoded, should be users location
  const region = {
    latitude: 42.65847,
    longitude: 21.1607,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  let markers: any[] = [];
  const mapRef = React.useRef<any | null>(null);

  React.useEffect(() => {
    mapRef.current.fitToCoordinates(markers, {
      animated: true,
      edgePadding: {
        top: Platform.OS === "ios" ? 100 : PixelRatio.get() * 100 - 50, // 50 is the baseMapPadding https://github.com/react-native-community/react-native-maps/blob/master/lib/android/src/main/java/com/airbnb/android/react/maps/AirMapView.java#L85
        right: 100,
        left: 100,
        bottom: Platform.OS === "ios" ? 400 : PixelRatio.get() * 350 - 50,
      },
    });
    return () => {};
  }, [searchLocations]);

  searchLocations.forEach((location) => {
    markers.push({
      latitude: location.geometry.location.lat,
      longitude: location.geometry.location.lng,
      description: "dfsdf",
      title: "title",
      pinColor: theme.darkPurple,
    });
  });

  let center;
  if (markers.length > 1) {
    center = getCenterOfBounds(markers);
    console.log(center);
  }

  return (
    <View style={[styles.container, {}]}>
      <View
        style={{
          position: "absolute",
          alignSelf: "flex-end",
          marginTop: SCREEN_HEIGHT / 12,
        }}
      >
        <View
          style={{
            marginRight: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              !!onIconPress && onIconPress();
            }}
          >
            <Icon name="add-circle" size={50} color={theme.darkPurple} />
          </TouchableOpacity>
        </View>
      </View>
      <MapView
        ref={mapRef}
        style={[
          styles.mapStyles,
          {
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
          },
        ]}
        initialRegion={region}
        provider={"google"}
        customMapStyle={mapTheme}
        pitchEnabled={false}
        rotateEnabled={false}
        zoomEnabled={false}
        scrollEnabled={false}
      >
        {markers.map((marker, i) => (
          <Marker
            key={i}
            identifier={`id${i}`}
            coordinate={marker}
            description={marker.description}
            pinColor={marker.pinColor}
          ></Marker>
        ))}
        {!!center && (
          <Circle
            center={center}
            radius={2000}
            strokeWidth={2}
            strokeColor={theme.purple}
            fillColor={"rgba(122, 72, 255, .3)"}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  mapStyles: {
    zIndex: -10,
  },
});
