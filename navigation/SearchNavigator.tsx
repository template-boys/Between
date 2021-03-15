import React, { ReactElement } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../features/Search/SearchScreen'

interface Props {

}

const SearchStack = createStackNavigator();

export default function SearchNavigator({ }: Props): ReactElement {
    return (
        <SearchStack.Navigator>
            <SearchStack.Screen name="Search Screen" component={SearchScreen} />
        </SearchStack.Navigator>
    )
}
