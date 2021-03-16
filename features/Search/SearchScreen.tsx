import React, { ReactElement } from 'react'
import { Text, View } from 'react-native'
import {NavigationScreenProp} from 'react-navigation'
import Button from '../../components/Button'
import AutoCompleteInputField from '../../components/AutoCompleteInputField'
import { setLocationOne } from '../../testActions'
import { useDispatch, useSelector } from 'react-redux'


interface Props {
    navigation: NavigationScreenProp<any,any>
}

export default function SearchScreen({ navigation }: Props): ReactElement {
    const dispatch = useDispatch()
    const locationOne = useSelector(state => state.testReducer.locationOne)
    console.log('selector: ', locationOne);
    

    const setLocation = (location) => {
        dispatch(setLocationOne(location))
        console.log(JSON.stringify(location));
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <Text>Select First Location</Text>
                <Text>{locationOne?.formatted_address ?? 'Not yet selected'}</Text>
                <AutoCompleteInputField setLocation={setLocation} />
            <Button type='primary' title="Continue" disabled={!locationOne} buttonStyle={{marginBottom: 20}} onPress={() => {navigation.navigate('Search Screen 2')}}/>
            </View>
            
        </>
    )
}



