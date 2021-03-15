import React, { Component } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY_1, GOOGLE_API_KEY_2 } from '@env';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSessionID } from '../testActions'



interface Props {
    testReducer: any
    setSessionID: () => string,
    setLocation: (any) => void
}
interface State {
    apiKey: string
}

class AutoCompleteInputField extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: Math.random() < 0.5 ? GOOGLE_API_KEY_1 : GOOGLE_API_KEY_2,
        }
    }

    render() {
        const { apiKey } = this.state
        const { sessionID } = this.props.testReducer

        return (
            <GooglePlacesAutocomplete
                placeholder='Search'
                fetchDetails={true}
                onPress={(data, details = null) => {
                    // console.log(JSON.stringify(details));
                    this.props.setSessionID()
                    this.props.setLocation(details)
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
        )
    }
}

const mapStateToProps = (state) => {
    const { testReducer } = state
    return { testReducer }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setSessionID,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteInputField);
