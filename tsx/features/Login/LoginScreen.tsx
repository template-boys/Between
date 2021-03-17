import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, SafeAreaView, View, Dimensions } from 'react-native'
import {Input} from 'react-native-elements'
import Button from '../../components/Button'
import { loginUser } from '../../../testActions';
import { useDispatch } from 'react-redux'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export function LoginScreen(){
const dispatch = useDispatch()
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <View style={{width: SCREEN_WIDTH, height: 0,
                    borderBottomColor: "#413C58",
                    borderTopColor: "transparent",
                    borderBottomWidth: SCREEN_HEIGHT / 4,
                    borderLeftWidth: SCREEN_HEIGHT,
                    borderLeftColor: 'transparent',
                    position: 'absolute', bottom: 0, borderTopStartRadius: 50, borderTopEndRadius: 50}} />
      
        <Text style={{fontSize: 26, fontWeight: "300", marginTop: 60, color: 'black'}}>Welcome Back</Text>
        <Text style={{fontSize: 32, fontWeight: "600", marginTop: 20, color: 'black'}}>inBetween</Text>
        <Input placeholder="yourname@example.com" label="Email" labelStyle={{color: "#444", marginBottom: 8, marginLeft: 12 }} inputStyle={{borderColor: '#e4e4e4', padding: 10, borderWidth: 2, borderRadius: 26, color: 'black', paddingTop: 12, paddingBottom: 12}} placeholderTextColor="#d4d4d4" containerStyle={{marginTop: 100}} inputContainerStyle={{borderBottomWidth:0}}/>
        <Input placeholder="yourpassword"  secureTextEntry={true} label="Password" labelStyle={{color: "#444", marginBottom: 8, marginLeft: 12 }} inputStyle={{borderColor: '#e4e4e4', padding: 10, borderWidth: 2, borderRadius: 26, color: 'black', paddingTop: 12, paddingBottom: 12 }} placeholderTextColor="#d4d4d4" containerStyle={{marginTop: 15}} inputContainerStyle={{borderBottomWidth:0}}/>
        <Button type= "primary" title="Login" onPress={() => {dispatch(loginUser())} }buttonStyle={{width: 180, marginTop: 30}} />
        <Button type= "secondary" title="Sign Up" buttonStyle={{width: 180, marginTop: 30}} />
    </SafeAreaView>
  )
}