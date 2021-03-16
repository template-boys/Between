import React, { useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY_1, GOOGLE_API_KEY_2 } from '@env';
import { v4 as UUIDGenerate} from 'uuid';

interface Props {
    setLocation: (any) => void;
}

function AutoCompleteInputField(props: Props) {
    const [apiKey, setApiKey] = useState(Math.random() < 0.5 ? GOOGLE_API_KEY_1 : GOOGLE_API_KEY_2);
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
