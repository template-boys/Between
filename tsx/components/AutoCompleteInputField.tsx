import React, { useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { v4 as UUIDGenerate} from 'uuid';
import { getGoogleApiKey } from '../utils/googleKeyUtil';

interface Props {
    setLocation: (any) => void;
}

function AutoCompleteInputField(props: Props) {
    const [apiKey, setApiKey] = useState(getGoogleApiKey());
    const [sessionID, setSessionID] = useState(UUIDGenerate());

    return (
        <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    setSessionID(UUIDGenerate());
                    props.setLocation(details);
                }}
                onFail={error => console.error(error)}
                query={{
                    sessiontoken: sessionID,
                    key: apiKey,
                    language: 'en',
                }}
                GooglePlacesDetailsQuery={{
                    fields: 'name,rating,formatted_phone_number,geometry/location,address_component,adr_address,business_status,formatted_address,geometry/viewport,place_id,plus_code,type,url',
                    sessiontoken: sessionID,
                    key: apiKey,
                }}
                debounce={200}
            />
    );
}

export default AutoCompleteInputField;
