import React, { ReactElement, useState } from "react";
import { Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Button from "../../components/Button";
import AutoCompleteInputField from "../../components/AutoCompleteInputField";
import { setLocationTwo } from "../../../testActions";
import { useDispatch, useSelector } from "react-redux";
import { getCenter } from "geolib";
import { placeSearch } from "../../api/PlaceSearch";
import { Input } from "react-native-elements";
import theme from "../../themes/theme";
import style from "../../themes/style";
import MapView, { Marker } from "react-native-maps";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default function SearchScreen2({ navigation }: Props): ReactElement {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const locationOne = useSelector((state) => state.testReducer.locationOne);
  const locationTwo = useSelector((state) => state.testReducer.locationTwo);

  const setLocation = (location) => {
    dispatch(setLocationTwo(location));
  };

  const handleSearch = async () => {
    console.log(search);
    const result = await placeSearch(search, "en", location);
    console.log(JSON.stringify(result.data));
  };

  let location;
  if (locationOne && locationTwo) {
    location = getCenter([
      {
        latitude: locationOne.geometry.location.lat,
        longitude: locationOne.geometry.location.lng,
      },
      {
        latitude: locationTwo.geometry.location.lat,
        longitude: locationTwo.geometry.location.lng,
      },
    ]);
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <Text
          style={[
            style.title1,
            {
              alignSelf: "center",
              marginTop: 60,
            },
          ]}
        >
          Select Second Location
        </Text>
        <AutoCompleteInputField setLocation={setLocation} />
        <Input
          placeholder="What are you looking for?"
          label="Type of place"
          labelStyle={{
            color: theme.charcoalGrey,
            marginBottom: 8,
          }}
          inputStyle={{
            borderColor: theme.lightGrey,
            padding: 10,
            borderBottomWidth: 2,
            color: theme.black,
            paddingTop: 12,
            paddingBottom: 12,
          }}
          placeholderTextColor={theme.lightGrey}
          containerStyle={{ marginTop: 45, paddingLeft: 20, paddingRight: 20 }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          onChangeText={(value) => setSearch(value)}
        />
        <Button
          type="primary"
          title="Search"
          disabled={!location || !search}
          onPress={handleSearch}
        />
        <Button
          type="secondary"
          title="Go Back"
          onPress={navigation.goBack}
          buttonStyle={{ marginTop: 30 }}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        {locationOne && (
          <MapView
            style={{
              height: 150,
              marginTop: 40,
              marginBottom: 10,
              width: 150,
              alignSelf: "center",
              borderRadius: 150 / 2,
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
        {locationTwo && (
          <MapView
            style={{
              height: 150,
              marginTop: 40,
              marginBottom: 10,
              width: 150,
              alignSelf: "center",
              borderRadius: 150 / 2,
              borderWidth: 2,
              borderColor: theme.purple,
            }}
            region={{
              latitude: locationTwo.geometry.location.lat,
              longitude: locationTwo.geometry.location.lng,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker
              coordinate={{
                latitude: locationTwo.geometry.location.lat,
                longitude: locationTwo.geometry.location.lng,
              }}
            />
          </MapView>
        )}
      </View>
    </>
  );
}
