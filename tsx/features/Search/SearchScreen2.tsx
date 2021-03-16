import React, { ReactElement, useState } from 'react'
import { Text, View } from 'react-native'
import {NavigationScreenProp} from 'react-navigation'
import Button from '../../components/Button'
import AutoCompleteInputField from '../../components/AutoCompleteInputField'
import { setLocationTwo } from '../../../testActions'
import { useDispatch, useSelector } from 'react-redux'
import { getCenter } from 'geolib';
import { placeSearch } from '../../api/PlaceSearch';
import { Input } from 'react-native-elements';



interface Props {
    navigation: NavigationScreenProp<any,any>
}

export default function SearchScreen2({ navigation }: Props): ReactElement {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch()
    const locationOne = useSelector(state => state.testReducer.locationOne)
    const locationTwo = useSelector(state => state.testReducer.locationTwo)

   
    const setLocation = (location) => {
        dispatch(setLocationTwo(location))
    }

    const handleSearch = async () => {
        console.log(search);
        const result = await placeSearch(search, 'en', location);
        console.log(JSON.stringify(result.data));
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
                <Input onChangeText={value => setSearch(value)}/>
                <Button type='secondary' title='Search' disabled={!location} onPress={handleSearch} />
            <Button type='primary' title="Continue" disabled={!locationOne} buttonStyle={{marginBottom: 20}} onPress={() => {}}/>
            </View>
            
        </>
    )
}



