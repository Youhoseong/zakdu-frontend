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
import axios from 'axios';
import {HS_API_END_POINT} from '../../Shared/env';

// import Loader from './Components/Loader';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;

function EnterEmail({navigation, route}) {
    const [email, setEmail] = useState("");
    const [checkGoNext, setCheckGoNext] = React.useState(false);
    const [checkError, setCheckError] = useState("이메일을 입력해주세요.");
    const [coloring, setColoring] = useState("blue");
    const onChangeText = async (text) => {
        const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        setEmail(text);
        if(text===""){
            setCheckError("이메일을 입력해주세요.");
            setCheckGoNext(false);
            setColoring("blue");
        }
        else if(!regex.test(text)){
            setCheckError("올바른 형식의 이메일을 입력해주세요.");
            setCheckGoNext(false);
            setColoring("red");
        }
        else{
            const formData = new FormData();
            let emailData = {
                email: text
            }
            formData.append('duplicateEmailCheckDto',JSON.stringify(emailData));
            console.log("formData = ",formData);
            await axios.get(`${HS_API_END_POINT}/user/register/email-check?email=${text}`)
            .then((res)=>{
                console.log("*********************",res);
                if(res.data){
                    setCheckError("사용가능한 이메일입니다!");
                    setCheckGoNext(true);
                    setColoring("blue");
                }
                else{
                    setCheckError("이미 사용중인 이메일이에요!");
                    setCheckGoNext(false);
                    setColoring("red");
                }
            });
            
        }
    }

    const gotoNextScreen = () => {
        if(checkGoNext === true){
            navigation.navigate('EnterPassword',{types: route.params.types, names: route.params.names, emails: email});
        }
        else{                    
            Alert.alert(
            "입력하신 이메일을 확인해주세요."
            );
        }
        // const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        // if(email===""){
        //     Alert.alert(
        //         "이메일을 입력해주세요."
        //     );
        // }
        // else if(!regex.test(email)){
        //     Alert.alert(
        //         "올바른 형식의 이메일을 입력해주세요."
        //     );
        // }
        // else{
        //     const formData = new FormData();
        //     formData.append()
        //     axios.get(`${HS_API_END_POINT}/user/register/email-check`,{
        //         body: {
        //             "email":email
        //         }
        //     }).then((res)=>{
        //         if(res === null){
        //             Alert.alert(
        //                 "올바른 형식의 이메일을 입력해주세요."
        //             );
        //         }
        //         else{
        //             navigation.navigate('EnterPassword',{types: route.params.types, names: route.params.names, emails: email});
        //         }
        //     })


            
        // }
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
                        <Text style={styles.subtitle}>작두의 로그인 아이디가 됩니다.</Text>
                    </View>
                    <View style={{flex:3,justifyContent:'flex-start'}}>
                        <TextInput 
                            style={{...styles.input, borderBottomColor:coloring==="blue"?'blue':'red'}}
                            onChangeText={onChangeText}
                            value={email}
                            placeholder="ex) zakdu@gmail.com"
                            keyboardType="email-address"
                            autoCapitalize='none'
                        
                        />
                        <Text style={{...styles.checkEr, color:coloring==="blue"?'gray':'red'}}>{checkError}</Text>
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
        
    },
    checkEr: {
        fontSize:15,
        marginLeft: 12,
    }
  });
export default EnterEmail;