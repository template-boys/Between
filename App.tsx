/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';


import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 1000,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

function FirstScreen({ navigation }: any) {
  return (
    <View>
      <Text>First Screen</Text>
      <Button onPress={() => {navigation.replace("SecondScreen")}} title="Second Screen" />
      <MapView
            provider="google"
            style={styles.map}
            region={{
            latitude: 42.0884,
            longitude: 87.9806,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
       }}
          >

      </MapView>
    </View>
  );
}

function SecondScreen({navigation}: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Second Screen</Text>
      <Button onPress={() => {navigation.replace("FirstScreen")}} title="First Screen" />
    </View>
  )
}

function About1Screen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>About 1</Text>
      <Button onPress={() => {navigation.replace("About2Screen")}} title="About 1" />
    </View>
  );
}

function About2Screen({navigation}: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>About 2</Text>
      <Button onPress={() => {navigation.replace("About1Screen")}} title="About 2" />
    </View>
  )
}

const HomeStack = createStackNavigator();

function HomeStackScreen({navigation}: any) {
  return (
  <HomeStack.Navigator>
    <HomeStack.Screen name="FirstScreen" component={FirstScreen}/>
    <HomeStack.Screen name="SecondScreen" component={SecondScreen}/>
  </HomeStack.Navigator>
  )
}

const AboutStack = createStackNavigator();

function AboutStackScreen({navigation}: any) {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen name="About1Screen" component={About1Screen}/>
      <AboutStack.Screen name="About2Screen" component={About2Screen}/>
    </AboutStack.Navigator>
  )
}
const BottomTab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen name="Home" component={HomeStackScreen} />
        <BottomTab.Screen name="About" component={AboutStackScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

export default App;
