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
    <SafeAreaView style={{flex: 1, alignItems: 'center',  alignSelf: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH/ 1.7}}>
      <>
      <View style={{backgroundColor: '#628B48', position: 'absolute', width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT}} />
      <View style={{borderRadius: SCREEN_WIDTH,
    width: SCREEN_WIDTH * 2,
    height: SCREEN_WIDTH * 2,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    top: -50}} />
   
    </>
      
        <Text style={{fontSize: 26, fontWeight: "300", marginTop: 60, color: '#444'}}>Welcome Back</Text>
        <Text style={{fontSize: 26, fontWeight: "200", marginTop: 15, color: '#444'}}>to</Text>
        <Text style={{fontSize: 32, fontWeight: "600", marginTop: 15, color: '#444'}}>in|Between</Text>
        <Input placeholder="yourname@example.com" label="Email" labelStyle={{color: "#444", marginBottom: 8, marginLeft: 12 }} inputStyle={{borderColor: '#e4e4e4', padding: 10, borderWidth: 2, borderRadius: 26, color: 'black', paddingTop: 12, paddingBottom: 12}} placeholderTextColor="#d4d4d4" containerStyle={{marginTop: 100}} inputContainerStyle={{borderBottomWidth:0}}/>
        <Input placeholder="yourpassword"  secureTextEntry={true} label="Password" labelStyle={{color: "#444", marginBottom: 8, marginLeft: 12 }} inputStyle={{borderColor: '#e4e4e4', padding: 10, borderWidth: 2, borderRadius: 26, color: 'black', paddingTop: 12, paddingBottom: 12 }} placeholderTextColor="#d4d4d4" containerStyle={{marginTop: 15}} inputContainerStyle={{borderBottomWidth:0}}/>
        <Button type= "primary" title="Login" onPress={() => {dispatch(loginUser())} }buttonStyle={{width: 180, marginTop: 30}} />
        <Button type= "secondary" title="Sign Up" buttonStyle={{width: 180, marginTop: 30}} />
    </SafeAreaView>
  )
}