import React, { ReactElement } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from '../features/Favorites/FavoritesScreen'

interface Props {

}

const FavoritesStack = createStackNavigator();

export default function FavoritesNavigator({ }: Props): ReactElement {
    return (
        <FavoritesStack.Navigator>
            <FavoritesStack.Screen name="Activity Screen" component={FavoritesScreen} />
        </FavoritesStack.Navigator>
    )
}
