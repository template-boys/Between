import React, { Component } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY_1, GOOGLE_API_KEY_2 } from '@env';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSessionID } from '../testActions'



interface Props {
    testReducer: any
    setSessionID: () => string
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
        // console.log(sessionID);

        return (
            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    this.props.setSessionID()
                }}
                onFail={error => console.error(error)}
                query={{
                    sessiontoken: sessionID,
                    key: apiKey,
                    language: 'en',
                }}
                GooglePlacesDetailsQuery={{
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
