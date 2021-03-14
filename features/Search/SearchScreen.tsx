import React, { ReactElement } from 'react'
import { Text, View } from 'react-native'
import Button from '../../components/Button'
import AutoCompleteInputField from '../../components/AutoCompleteInputField'

interface Props {

}

export default function SearchScreen({ }: Props): ReactElement {
    return (
        <>
            <View style={{ flex: 1 }}>
                <AutoCompleteInputField />
            </View>
            <Button type='primary' title="I am a Button" />
            <Button type='secondary' title="I am a Button" buttonStyle={{ marginTop: 20 }} />
        </>
    )
}
