import React, {useState, createRef} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { NavigationContainer } from '@react-navigation/native';
import RegisterStep1 from './RegisterStep/EnterName';

// import Loader from './Components/Loader';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;

const RegiStack = createStackNavigator();

function RegisterScreen ({navigation}){
    return(
        <View style={{flex:1,flexDirection:'row', backgroundColor:'white'}}>
            <View style={{flex:1}}/>
            <View style={{flex:3}}>
                <View style={{flex:4,justifyContent:'flex-end',alignItems:'center',alignContent:'center'}}>
                    <LottieView style={{width:'100%',height:'100%',margin:0}} source={require('../Assets/json/42476-register.json')} autoPlay loop />
                    {/* <Text>Hello</Text> */}
                </View>
                <View style={{flex:1,justifyContent:'flex-start'}}>
                    <Text style={styles.midText}>쉽고, 간편한 회원가입을 통해</Text>
                    <Text style={styles.midText}>ZakDu의 회원이 되어보세요!</Text>
                </View>
                <View style={{flex:2,justifyContent:'flex-start',alignItems:'center'}}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('EnterName')}
                        style={styles.btn} 
                        activeOpacity={0.5}
                    >
                        <Text style={[styles.botText, {color: 'white',fontWeight:'bold'}]}>ZakDu 회원가입</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:1}}>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    midText: {
        textAlign:'center',
        fontSize: bigOne*0.02,
        fontWeight:'bold'
    },
    activityIndicator: {
      alignItems: 'center',
      height: 80,
    },
    btn: {
      height: bigOne*0.05,
      width: '50%',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
    },
    botText: {
        textAlign:'center',
        fontSize: bigOne*0.017,
    }
  });

export default RegisterScreen;