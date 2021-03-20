import React, { ReactElement, useState } from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { NavigationScreenProp } from "react-navigation";
import Button from "../../components/Button";
import AutoCompleteInputField from "../../components/AutoCompleteInputField";
import { setLocationOne } from "../../../testActions";
import { useDispatch, useSelector } from "react-redux";
import style from "../../themes/style";
import theme from "../../themes/theme";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default function SearchScreen({ navigation }: Props): ReactElement {
  const dispatch = useDispatch();
  const locationOne = useSelector((state) => state.testReducer.locationOne);

  const setLocation = (location) => {
    dispatch(setLocationOne(location));
  };

  return (
    <>
      <View style={{ display: "flex" }}>
        <Text
          style={[
            style.title1,
            {
              alignSelf: "center",
              marginTop: 60,
            },
          ]}
        >
          Select First Location
        </Text>

        <AutoCompleteInputField setLocation={setLocation} />

        <View>
          <Button
            type="primary"
            title="Next"
            disabled={!locationOne}
            onPress={() => {
              navigation.navigate("Search Screen 2");
            }}
            buttonStyle={{ marginTop: 90 }}
          />
        </View>
      </View>
      {locationOne && (
        <MapView
          style={{
            height: 300,
            marginTop: 40,
            width: 300,
            alignSelf: "center",
            borderRadius: 300 / 2,
            zIndex: -10,
            borderWidth: 2,
            borderColor: theme.purple,
          }}
          region={{
            latitude: locationOne.geometry.location.lat,
            longitude: locationOne.geometry.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: locationOne.geometry.location.lat,
              longitude: locationOne.geometry.location.lng,
            }}
          />
        </MapView>
      )}
    </>
  );
}
