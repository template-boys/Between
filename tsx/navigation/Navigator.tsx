import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SearchNavigator from './SearchNavigator'
import ActivityNavigator from './ActivityNavigator'
import FavoritesNavigator from './FavoritesNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import {LoginScreen} from '../features/Login/LoginScreen'
import { useSelector } from 'react-redux'

const BottomTab = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const RootStack = createStackNavigator();

function Auth(){
    return(
        <AuthStack.Navigator>
                    <AuthStack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        </AuthStack.Navigator>
    )
}

function App(){
    return(
        <BottomTab.Navigator tabBarOptions={{
            activeTintColor: '#413C58',
          }}>
            <BottomTab.Screen name="Search" component={SearchNavigator} />
            <BottomTab.Screen name="Activity" component={ActivityNavigator} />
            <BottomTab.Screen name="Favorites" component={FavoritesNavigator} />
        </BottomTab.Navigator>
    )
}

function BottomNavigator() {
    const isLoggedIn = useSelector(state => state.testReducer.loggedIn)
    return (
        <NavigationContainer>
            <RootStack.Navigator>
            {isLoggedIn ? <RootStack.Screen  options={{headerShown: false}} name='App' component={App}/>:  <RootStack.Screen name='Auth' component={Auth} options={{headerShown: false}}/> }
            </RootStack.Navigator>    
        </NavigationContainer>
    )
}

export default BottomNavigator;