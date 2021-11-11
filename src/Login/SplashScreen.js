import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LottieView from 'lottie-react-native';
import { Dimensions,Text } from 'react-native';
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('여기를 user_information으로 바꾸면 아이디 있으면 자동로그인').then((value) =>
        navigation.replace(value === null ? 'Auth' : 'BottomNav'),
      );
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../src/viva-logo-with-txt.png')}
        style={{width: screenWidth*0.5, resizeMode: 'contain', margin: 30}}
      /> */}
      <LottieView style={{flex:3}} source={require('../Assets/json/9844-loading-40-paperplane.json')} autoPlay loop />
      <View style={{height:screenHeight*0.4,alignSelf:'flex-end'}}>
        <Text style={{ textAlign:'center', fontSize:bigOne*0.03, fontWeight:'bold'}}>Flying to ZakDu ...</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
      flexDirection:'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});