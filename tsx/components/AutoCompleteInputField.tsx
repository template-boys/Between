import React, { useRef, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { v4 as UUIDGenerate } from "uuid";
import { getGoogleApiKey } from "../utils/googleKeyUtil";
import theme from "../themes/theme";
interface Props {
  setLocation: (any) => void;
}

function AutoCompleteInputField(props: Props) {
  const [apiKey, setApiKey] = useState(getGoogleApiKey());
  const [sessionID, setSessionID] = useState(UUIDGenerate());
  const ref = useRef<any | null>(null);

  // navigator.geolocation = require('@react-native-community/geolocation');

  return (
    <GooglePlacesAutocomplete
      textInputProps={{
        onBlur: () => ref.current?.setAddressText(""),
        placeholderTextColor: theme.lightGrey,
      }}
      ref={ref}
      minLength={1}
      fetchDetails={true}
      onPress={(data, details = null) => {
        setSessionID(UUIDGenerate());
        props.setLocation(details);
        ref.current?.setAddressText("");
      }}
      onFail={(error) => console.error(error)}
      query={{
        sessiontoken: sessionID,
        key: apiKey,
        language: "en",
      }}
      GooglePlacesDetailsQuery={{
        fields:
          "name,rating,formatted_phone_number,geometry/location,address_component,adr_address,business_status,formatted_address,geometry/viewport,place_id,plus_code,type,url",
        sessiontoken: sessionID,
        key: apiKey,
      }}
      styles={{
        container: {
          zIndex: 50,
          overflow: "visible",
        },
        textInputContainer: {
          borderTopWidth: 0,
          borderBottomWidth: 2,
          height: 50,
          overflow: "visible",
          backgroundColor: theme.lightestGrey,
          borderColor: theme.darkPurple,
        },
        textInput: {
          backgroundColor: theme.lightestGrey,
          fontSize: 15,
          lineHeight: 22.5,
          paddingBottom: 0,
          flex: 1,
          color: theme.charcoalGrey,
        },
        listView: {
          position: "absolute",
          top: 60,
          left: 10,
          right: 10,
          backgroundColor: "white",
          borderRadius: 5,
          flex: 1,
          elevation: 3,
          zIndex: 50,
        },
        row: {},
        description: {
          color: theme.purple,
        },
        predefinedPlacesDescription: {
          color: "#1faadb",
        },
      }}
      debounce={200}
      placeholder="Search city, address, or place"
      GoogleReverseGeocodingQuery={
        {
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }
      }
    />
  );
}

export default AutoCompleteInputField;
