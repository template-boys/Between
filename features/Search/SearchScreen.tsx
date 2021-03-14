import React, { ReactElement } from 'react'
import { Text, View } from 'react-native'
import Button from '../../components/Button'

interface Props {

}

export default function SearchScreen({ }: Props): ReactElement {
    return (
        <View>
            <Text>This is the search screen.</Text>
            <Button type='primary' title="I am a Button" />
            <Button type='secondary' title="I am a Button" buttonStyle={{ marginTop: 20 }} />
        </View>
    )
}
