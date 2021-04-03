import React, { ReactElement } from "react";
import { PixelRatio, Platform, StyleSheet } from "react-native";
import { View, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import theme from "../../../themes/theme";
import mapTheme from "./mapStyle";
import Button from "../../../components/Button";

interface Props {
  showShadow?: boolean;
  diameter?: number;
  onIconPress?: () => void;
  onRemovePress: (index: number) => void;
  searchLocations: any;
  searchResult: any;
}

export default function FullMapView({
  onIconPress,
  searchLocations,
  onRemovePress,
  searchResult,
}: Props): ReactElement {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get(
    "window"
  );
  const [pressedMarker, setPressedMarker] = React.useState(-1);
  const mapRef = React.useRef<any | null>(null);
  const placeMarker = React.useRef<any | null>(null);

  const placeIndex = useSelector((state) => state.searchReducer.placeIndex);
  const searchLoading = useSelector(
    (state) => state.searchReducer.searchLoading
  );

  //hardcoded, should be users location
  const region = {
    latitude: 42.65847,
    longitude: 21.1607,
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
        bottom: Platform.OS === "ios" ? 400 : PixelRatio.get() * 350 - 50,
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

  return (
    <View style={[styles.container, {}]}>
      {pressedMarker >= 0 && (
        <TouchableOpacity
          style={{
            position: "absolute",

            marginTop: SCREEN_HEIGHT / 11,
            alignSelf: "flex-start",
          }}
        >
          <Button
            title="Remove"
            type="primary"
            onPress={() => {
              onRemovePress(pressedMarker);
              setPressedMarker(-1);
            }}
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => {
          !!onIconPress && onIconPress();
        }}
        style={{
          flexDirection: "row",
          // marginRight: 30,
          position: "absolute",
          alignSelf: "flex-end",
          marginTop: SCREEN_HEIGHT / 12,
        }}
      >
        {searchLocations.length === 0 ? (
          <Button
            title="Add a Location"
            type="primary"
            icon={<Icon name="add-outline" size={30} color={"white"} />}
            buttonStyle={{
              paddingLeft: 25,
              padingRight: 30,
              justifyContent: "space-between",
              width: SCREEN_WIDTH / 2,
            }}
            onPress={() => {
              !!onIconPress && onIconPress();
            }}
          />
        ) : (
          <Icon
            name="add-circle"
            size={50}
            color={theme.darkPurple}
            style={{ marginRight: 30 }}
          />
        )}
      </TouchableOpacity>

      <MapView
        ref={mapRef}
        onPress={() => {
          setPressedMarker(-1);
        }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  mapStyles: {
    zIndex: -10,
  },
});
