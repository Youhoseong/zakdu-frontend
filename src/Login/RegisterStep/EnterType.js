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
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Animation from 'lottie-react-native';
// import Loader from './Components/Loader';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;

function EnterType({navigation}) {
    const [name, setName] = useState("");
    const [number, onChangeNumber] = React.useState(null);
    const onChangeText = (name) => {
        setName(name);
    }
    const gotoNextScreen = (type) => {
        // if(name === ""){
        //     Alert.alert(
        //         "이름을 입력해주세요!"
        //     );
        // }
        // else{
            Alert.alert(type);
            navigation.navigate('EnterName');
        //}
    }

    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex:1}}>
            <View style={{flex:9,flexDirection:'column', padding:'3%',backgroundColor:'white'}}>
                <View style={{flex:9}}>
                    <View style={{flex:1, backgroundColor:'white',justifyContent:'flex-end'}}>
                        {/* <LottieView style={{width:'100%',height:'100%',margin:0}} source={require('../../Assets/json/42476-register.json')} autoPlay loop /> */}
                        {/* <Text style={styles.title}>Step 1.</Text> */}
                        <Text style={styles.title}>역할을 선택해주세요.</Text>
                    </View>
                    <View style={{flex:0.5, padding:10,backgroundColor:'white',justifyContent:'flex-start'}}>
                        <Text style={styles.subtitle}>도서 판매자와 구매자를 고를 수 있어요.</Text>

                    </View>
                    <View style={{flex:4, flexDirection:'row',justifyContent:'center'}}>
                        <View style={{flex:1, justifyContent:'flex-start',alignItems:'center'}}>
                            <TouchableOpacity style={{ 
                                justifyContent:'center',
                                alignItems:'center', 
                                width:screenWidth===bigOne? bigOne*0.3:smallOne*0.4,
                                height:screenHeight===bigOne? bigOne*0.3:smallOne*0.5,
                                }}
                                onPress={() => {gotoNextScreen('seller')}}
                                
                            >
                            <LottieView style={{width:screenWidth===bigOne? bigOne*0.3:smallOne*0.6,alignSelf:'center'}} source={require('../../Assets/json/22620-store.json')} autoPlay />
                                <Text style={{fontSize:responsiveFontSize(1.5)}}>판매자</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1, justifyContent:'flex-start',alignItems:'center'}}>
                            <TouchableOpacity style={{ 
                                justifyContent:'center',
                                alignItems:'center',
                                width:screenWidth===bigOne? bigOne*0.3:smallOne*0.4,
                                height:screenHeight===bigOne? bigOne*0.3:smallOne*0.5,
                                }}
                                onPress={() => {gotoNextScreen('customer')}}
                            >
                                <LottieView style={{width:screenWidth===bigOne? bigOne*0.25:smallOne*0.5,alignSelf:'center'}} source={require('../../Assets/json/71390-shopping-cart-loader.json')} autoPlay loop />
                                <Text style={{fontSize:responsiveFontSize(1.5)}}>구매자</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* <View 
                // behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex:2, padding:'1%', justifyContent:'flex-end'}}>
                    // <TouchableOpacity 
                    //     onPress={gotoNextScreen}
                    //     style={styles.nextBtn} 
                    //     //activeOpacity={0.5}
                    // >
                    //     <Text style={[styles.botText, {color: 'white'}]}>다음</Text>
                    // </TouchableOpacity>

                </View> */}
                <View style={{flex:0.5}}/>
            </View>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    title: {
        fontSize: bigOne*0.025,
        fontWeight:'bold',
        textAlign:'center'
    },
    subtitle:{

        fontSize: bigOne*0.015,
        color:'gray',
        textAlign:'center'
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
        color:'blue',
        
        
    },
  });
export default EnterType;