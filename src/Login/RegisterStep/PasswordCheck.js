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
  Alert,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import Loader from './Components/Loader';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;

function PasswordCheck({navigation, route}) {
    const [text, onChangeText] = React.useState(null);
    const [number, onChangeNumber] = React.useState(null);
    const point = 100000;
    const onPress = () => {
        if(text === route.params.passwords){
            // 여기에 데이터를 async storage 로 전달
            const dataToSend = {names:route.params.names, emails:route.params.emails, passwords:route.params.passwords, points:point}
            AsyncStorage.setItem('user_information',JSON.stringify({
                'user_name': route.params.names,
                'user_id' : route.params.emails,
                'user_password' : route.params.passwords,
                'user_point' : point
            }));
            Alert.alert(
                "로그인하여 작두를 시작하세요.",
                "회원가입이 완료되었습니다.",
                [{
                    text:"로그인 화면으로",
                    onPress: () => navigation.navigate('Login')
                }]
            );
        } else {
            Alert.alert(
                "올바른 패스워드를 입력해주세요."
            );
        }

    }
    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex:1}}>
            <View style={{flex:9,flexDirection:'column', padding:'3%',backgroundColor:'white'}}>
                <View style={{flex:9}}>
                    <View style={{flex:2, backgroundColor:'white',justifyContent:'flex-end'}}>
                        {/* <LottieView style={{width:'100%',height:'100%',margin:0}} source={require('../../Assets/json/42476-register.json')} autoPlay loop /> */}
                        <Text style={styles.title}>Step 4.</Text>
                        <Text style={styles.title}>비밀번호 확인을 위해 다시한번 입력해주세요</Text>
                    </View>
                    <View style={{flex:0.5, backgroundColor:'white',justifyContent:'center'}}>
                        <Text style={styles.subtitle}>[Step 3] 의 비밀번호와 같은 비밀번호를 입력해요.</Text>
                    </View>
                    <View style={{flex:3,justifyContent:'flex-start'}}>
                        <TextInput 
                            style={styles.input}
                            onChangeText={onChangeText}
                            value={text}
                            placeholder="password check"
                            autoCapitalize='none'
                            secureTextEntry={true}
                        
                        />
                    </View>
                </View>
                <View 
                // behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex:2, padding:'1%', justifyContent:'flex-end'}}>
                    <TouchableOpacity 
                        onPress={onPress}
                        style={styles.nextBtn} 
                        //activeOpacity={0.5}
                    >
                        <Text style={[styles.botText, {color: 'white'}]}>완료</Text>
                    </TouchableOpacity>

                </View>
                <View style={{flex:1}}/>
            </View>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    title: {
        fontSize: bigOne*0.025,
        fontWeight:'bold'
    },
    subtitle:{

        fontSize: bigOne*0.015,
        color:'gray',
    },
    activityIndicator: {
      alignItems: 'center',
      height: 80,
    },
    btn: {
      height: bigOne*0.04,
      width: '50%',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
    },
    botText: {
        textAlign:'center',
        fontSize: bigOne*0.017,
        fontWeight:'500',
    },
    nextBtn: {
        height: '100%',
        width:'100%',
        maxHeight:70,
        borderRadius:10,
        backgroundColor:'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },  
    input: {
        height: bigOne*0.1,
        margin: 12,
        borderBottomWidth: 3,
        padding: 10,
        borderBottomColor:'blue',
        fontSize:bigOne*0.02,
        
    },
  });
export default PasswordCheck;