// import React from 'react';
// import {StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';

// import { Dimensions } from 'react-native';
// import LoginScreen from './LoginScreen';
// import RegisterScreen from './RegisterScreen';

// const Stack = createStackNavigator();
// const screenWidth = Dimensions.get('screen').width;
// const screenHeight = Dimensions.get('screen').height;

// const LoginMain = ({navigation}) => {
//   return (
//     <View style={styles.container}>
//       <View style={{flex: 2}} />
//       <View style={{flex: 4}}>
//         <View style={styles.logoArea}>
//             <Text style={{fontSize:screenWidth*0.05}}>ZakDu</Text>
//           {/* <Image
//             source={require('../src/viva-logo-with-txt.png')}
//             style={{width: '55%', resizeMode: 'contain'}}
//           /> */}
//         </View>
//         <View style={styles.btnArea}>
//           <TouchableOpacity 
//             onPress={() => navigation.navigate('Login')}
//             style={styles.btnoutline}
//           >
//             <Text>LOGIN (로그인)</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.btnArea}>
//           <TouchableOpacity 
//             onPress={() => navigation.navigate('Register')}
//             style={styles.btn}
//           >
//             <Text style={{color: 'white'}}>REGISTER (회원가입)</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={{flex: 2}} />
//     </View>
//   );
// }
// function MainLog() {

//     return (

//         <Stack.Navigator>

//             <Stack.Screen
//             name="LoginMain"
//             component={LoginMain}
//             options={{headerShown: false}}
//             />
            
//             <Stack.Screen
//             name="Login"
//             component={LoginScreen}
//             options={{
//                 title:'',
//                 headerBackTitleVisible:false,
//             }}
//             />
//             <Stack.Screen
//             name="Register"
//             component={RegisterScreen}
//             options={{
//                 title:'',
//                 headerBackTitleVisible:false,
//             }}
//             />
            
//         </Stack.Navigator>
        

        
//     )
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1, //전체의 공간을 차지한다는 의미
//         flexDirection: 'column',
//         backgroundColor: 'white',
//       },
//       logoArea: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         // backgroundColor: 'red',
//         paddingBottom: screenWidth*0.01,
//       },
//       btnArea: {
//         height: screenHeight*0.08,
//         // backgroundColor: 'orange',
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingBottom: screenHeight*0.01,
//       },
//       btn: {
//         flex: 1,
//         width: screenWidth*0.50,
//         borderRadius: 5,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'black',
//       },
//       btnoutline: {
//         flex: 1,
//         width: screenWidth*0.50,
//         borderRadius: 5,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'white',
//         borderWidth: 1,
//       },
// });

// export default MainLog;