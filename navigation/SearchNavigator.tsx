import React, { ReactElement } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../features/Search/SearchScreen'
import SearchScreen2 from '../features/Search/SearchScreen2'


interface Props {

}

const SearchStack = createStackNavigator();

export default function SearchNavigator({ }: Props): ReactElement {
    return (
        <SearchStack.Navigator>
            <SearchStack.Screen name="Search Screen" component={SearchScreen} />
            <SearchStack.Screen name="Search Screen 2" component={SearchScreen2} />
        </SearchStack.Navigator>
    )
}
