import React, { ReactElement } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import theme from "../../../themes/theme";
import mapTheme from "../../../../assets/mapThemes/mapTheme";
import { Coordinate, TomTomOriginResult } from "../redux/searchReducerTypes";
import { useSelector } from "react-redux";
import { State } from "../../../../rootReducer";
import { getCurrentDestination } from "../redux/searchSelector";

interface Props {
  location: { longitude: number; latitude: number };
  polylineArrays: Array<Coordinate[]>;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function MapLocationView({
  location,
  polylineArrays,
}: Props): ReactElement {
  const mapRef = React.useRef<any | null>(null);

  const origins = useSelector(
    (state: State): TomTomOriginResult[] => state.searchReducer.origins
  );

  const currentDestination = useSelector(getCurrentDestination);

  //Zoom map to show all coordinate of directions array when they change
  React.useEffect(() => {
    //This timeout is needed for the animation to actually occur
    let originCoordinates = origins.map(
      (origin: TomTomOriginResult): Coordinate => {
        return {
          longitude: origin.position.lon,
          latitude: origin.position.lat,
        };
      }
    );
    setTimeout(() => {
      mapRef.current?.fitToCoordinates(
        [...originCoordinates, ...[currentDestination.coordinates]],
        {
          animated: true,
          edgePadding: {
            top: 70,
            right: 30,
            left: 30,
            bottom: 70,
          },
        }
      );
    }, 250);
  }, [origins]);

  const shouldShowPolyLines = polylineArrays.length > 0;

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
            {polylineArrays.map((polylineArray) => (
              <Polyline
                coordinates={polylineArray}
                strokeWidth={5}
                strokeColors={[theme.secondary, theme.darkPurple]}
              />
            ))}
            {origins.map((origin, index) => {
              return (
                <Marker
                  coordinate={{
                    longitude: origin.position.lon,
                    latitude: origin.position.lat,
                  }}
                  key={`${origin.position.lon}.${origin.position.lat}.${index}`}
                  pinColor={theme.secondary}
                />
              );
            })}

            <Marker
              coordinate={{
                longitude: currentDestination.coordinates.longitude,
                latitude: currentDestination.coordinates.latitude,
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
