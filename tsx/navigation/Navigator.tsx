import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SearchNavigator from './SearchNavigator'
import ActivityNavigator from './ActivityNavigator'
import FavoritesNavigator from './FavoritesNavigator';


const BottomTab = createBottomTabNavigator();


function BottomNavigator() {
    return (
        <NavigationContainer>
            <BottomTab.Navigator>
                <BottomTab.Screen name="Search" component={SearchNavigator} />
                <BottomTab.Screen name="Activity" component={ActivityNavigator} />
                <BottomTab.Screen name="Favorites" component={FavoritesNavigator} />
            </BottomTab.Navigator>
        </NavigationContainer>
    )
}


export default BottomNavigator;