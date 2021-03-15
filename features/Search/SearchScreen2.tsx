import React, { ReactElement } from 'react'
import { Text, View } from 'react-native'
import {NavigationScreenProp} from 'react-navigation'
import Button from '../../components/Button'
import AutoCompleteInputField from '../../components/AutoCompleteInputField'
import { setLocationTwo } from '../../testActions'
import { useDispatch, useSelector } from 'react-redux'
import { getCenter } from 'geolib';


interface Props {
    navigation: NavigationScreenProp<any,any>
}

export default function SearchScreen2({ navigation }: Props): ReactElement {
    const dispatch = useDispatch()
    const locationOne = useSelector(state => state.testReducer.locationOne)
    const locationTwo = useSelector(state => state.testReducer.locationTwo)

   
    const setLocation = (location) => {
        dispatch(setLocationTwo(location))
    }


   

    let location;
    if(locationOne && locationTwo){
         location = getCenter([
            { latitude: locationOne.geometry.location.lat, longitude: locationOne.geometry.location.lng },
            { latitude: locationTwo.geometry.location.lat, longitude: locationTwo.geometry.location.lng },
        ] )
    }
    
    return (
        <>
            <View style={{ flex: 1 }}>
                <Text>Select Second Location</Text>
                <Text>Location One: {locationOne?.formatted_address ?? 'Not yet selected'}</Text>
                <Text>Location Two: {locationTwo?.formatted_address ?? 'Not yet selected'}</Text>
                <Text>{location?.latitude} {location?.longitude}</Text>
                <AutoCompleteInputField setLocation={setLocation} />
            <Button type='primary' title="Continue" disabled={!locationOne} buttonStyle={{marginBottom: 20}} onPress={() => {}}/>
            </View>
            
        </>
    )
}



