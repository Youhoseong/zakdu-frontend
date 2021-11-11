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

// import Loader from './Components/Loader';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;

function EnterEmail({navigation, route}) {
    const [email, setEmail] = useState("");
    const [number, onChangeNumber] = React.useState(null);

    const onChangeText = (email) => {
        setEmail(email);
    }

    const gotoNextScreen = () => {
        const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if(email===""){
            Alert.alert(
                "이메일을 입력해주세요!"
            );
        }
        else if(!regex.test(email)){
            Alert.alert(
                "올바른 형식의 이메일을 입력해주세요!"
            );
        }
        else{
            navigation.navigate('EnterPassword',{names: route.params.names, emails: email});
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
                        <Text style={styles.title}>Step 2.</Text>
                        <Text style={styles.title}>이메일을 입력해주세요</Text>
                    </View>
                    <View style={{flex:0.5, backgroundColor:'white',justifyContent:'center'}}>
                        <Text style={styles.subtitle}>ZakDu의 로그인 아이디가 됩니다!</Text>
                    </View>
                    <View style={{flex:3,justifyContent:'flex-start'}}>
                        <TextInput 
                            style={styles.input}
                            onChangeText={onChangeText}
                            value={email}
                            placeholder="ex) zakdu@gmail.com"
                            keyboardType="email-address"
                            autoCapitalize='none'
                        
                        />
                    </View>
                </View>
                <View 
                // behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex:2, padding:'1%', justifyContent:'flex-end'}}>
                    <TouchableOpacity 
                        onPress={gotoNextScreen}
                        style={styles.nextBtn} 
                        //activeOpacity={0.5}
                    >
                        <Text style={[styles.botText, {color: 'white'}]}>다음</Text>
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
        fontWeight:'bold',
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
        color:'blue'
        
    },
  });
export default EnterEmail;