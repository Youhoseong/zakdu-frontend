import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import RegisterScreen from './RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const bigOne = screenWidth > screenHeight ? screenWidth:screenHeight;
const smallOne = screenWidth < screenHeight ? screenWidth:screenHeight;
  
function LoginScreen({navigation}) {
  const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    const passwordInputRef = createRef();

    const handleSubmitPress = () => {
      setErrortext('');
      if (!userEmail) {
        alert('Please fill Email');
        return;
      }
      if (!userPassword) {
        alert('Please fill Password');
        return;
      }
      setLoading(true);
      let dataToSend = {email: userEmail, password: userPassword};
      let formBody = [];
      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        body: formBody,
        headers: {
          //Header Defination
          'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //Hide Loader
          setLoading(false);
          console.log(responseJson);
          // If server response message same as Data Matched
          if (responseJson.status === 'success') {
            AsyncStorage.setItem('user_id', responseJson.data.email);
            console.log(responseJson.data.email);
            navigation.replace('DrawerNavigationRoutes');
          } else {
            setErrortext(responseJson.msg);
            console.log('Please check your email id or password');
          }
        })
        .catch((error) => {
          //Hide Loader
          setLoading(false);
          console.error(error);
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.topArea}>
              
                <View style={styles.titleArea}>
                  <LottieView style={{alignItems:'center'}} source={require('../Assets/json/34151-book-turner.json')} autoPlay loop />
                  
                  {/* <Text style={{textAlign:'center', fontSize:bigOne*0.06}}>ZakDu</Text> */}
                  
                </View>
            </View>

            <View style={styles.formArea}>
                  <TextInput
                    style={styles.textFormTop}
                    onChangeText={(UserEmail) =>
                      setUserEmail(UserEmail)
                    }
                    placeholder="Enter Email" //dummy@abc.com
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      passwordInputRef.current &&
                      passwordInputRef.current.focus()
                    }
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                  <TextInput
                  style={styles.textFormBottom}
                  onChangeText={(UserPassword) =>
                    setUserPassword(UserPassword)
                  }
                  placeholder="Enter Password" //12345
                  placeholderTextColor="#8b9cb5"
                  keyboardType="default"
                  ref={passwordInputRef}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                />
                {/* <Text style={{...styles.TextValidation}}>유효하지 않은 ID입니다.</Text> */}
            </View>
            <View style={{flex:0.75}}>
              <Text 
                onPress={() => navigation.navigate('Register')}
                style={styles.toRegister}
              >
                아직 ZakDu의 회원이 아니라면 여기를 눌러 가입해주세요!
              </Text>
            </View>
            <View style={{flex: 0.75}}>
                <View style={styles.btnArea}>
                    <TouchableOpacity 
                      style={styles.btn} 
                      activeOpacity={0.5}
                      onPress={handleSubmitPress}
                    >
                        <Text style={[styles.Text, {color: 'white'}]}>로그인</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 3}} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1, //전체의 공간을 차지한다는 의미
      flexDirection: 'column',
      backgroundColor: 'white',
      paddingLeft: screenWidth*0.07,
      paddingRight: screenWidth*0.07,
    },
    topArea: {
        flex: 3,
        paddingTop: screenWidth*0.01,
    },
    titleArea: {
      flex: 3,
      justifyContent: 'flex-end',
      paddingTop: screenWidth*0.03,
    },
    TextArea: {
        backgroundColor:'blue',
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    Text: {
      fontSize: bigOne*0.015,
      fontWeight:'bold'
    },
    TextValidation: {
      fontSize: screenWidth*0.02,
      color: 'red',
      paddingTop: screenWidth*0.02,
    },
  
    formArea: {
      width:screenWidth*0.5,
      justifyContent: 'center',
      
      // paddingTop: screenWidth(10),
      flex: 2,
      alignSelf:'center'
    },
    textFormTop: {
      borderWidth: 2,
      borderBottomWidth: 1,
      borderColor: 'blue',
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
      width: '100%',
      height: smallOne*0.07,
      paddingLeft: 10,
      paddingRight: 10,
    },
    textFormBottom: {
      borderWidth: 2,
      borderTopWidth: 1,
      borderColor: 'blue',
      borderBottomRightRadius: 7,
      borderBottomLeftRadius: 7,
      width: '100%',
      height: smallOne*0.07,
      paddingLeft: 10,
      paddingRight: 10,
    },
    btnArea: {
      height: smallOne*0.07,
      // backgroundColor: 'orange',
      justifyContent: 'center',
      alignSelf:'center',
      alignItems: 'center',
      width:screenWidth*0.5,
      paddingBottom: screenHeight*0.01,
    },
    btn: {
      flex: 1,
      width: '100%',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
    },
    toRegister: {
      fontSize: bigOne*0.015,
      textDecorationLine: 'underline',
      color:'gray',
      alignSelf:'center',
      
    },
  });
export default LoginScreen;