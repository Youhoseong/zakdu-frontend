import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home/index';
import Test from './Home/HomeComponent/Test';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Styled from 'styled-components';
import BookStore from './BookStore';
import BookShelf from './BookShelf';
import MyPage from './MyPage';
import MainLog from './Login/MainLog';
import LoginScreen from './Login/LoginScreen';
import RegisterScreen from './Login/RegisterScreen';
import SplashScreen from './Login/SplashScreen';
import EnterPassword from './Login/RegisterStep/EnterPassword';
import EnterName from './Login/RegisterStep/EnterName';
import EnterEmail from './Login/RegisterStep/EnterEmail';
import PasswordCheck from './Login/RegisterStep/PasswordCheck';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EnterType from './Login/RegisterStep/EnterType';

const Stack = createStackNavigator();
const LogStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

// const Placeholder = Styled.View`
  
// `;


const TabPlaceholder = () => {
  return (<Placeholder>
            <Text>This is Temp Page.</Text>
        </Placeholder>
        );
};

const BottomNavigation = ({navigation}) => {
    return (
        <BottomTab.Navigator>
            {/* <BottomTab.Screen
                name="ReadingBook"
                component={Home}
                options={{
                    tabBarLabel: "읽고 있는 책",
                    headerShown: false,
                    animationEnabled: false
                 
                }}
            >
            </BottomTab.Screen> */}
            <BottomTab.Screen
                name="BookShelf"
                component={BookShelf}
                options={{
                    tabBarLabel: '보관함',
                    headerShown: false,
                    animationEnabled: false,
                    tabBarIcon: ()=> (
                        <MaterialCommunityIcons name="bookshelf" size={25} />
                    )
                }}
            >
            </BottomTab.Screen>
            <BottomTab.Screen
                name="BookStore"
                component={BookStore}
                options={{
                    tabBarLabel: '북스토어',
                    headerShown: false,
                    animationEnabled: false,
                    tabBarIcon: ()=> (
                        <MaterialCommunityIcons name="cart" size={25} />
                    )
                }}
            >
            </BottomTab.Screen>
            <BottomTab.Screen
                name="MyPage"
                component={MyPage}
                options={{
                    tabBarLabel: '마이페이지',
                    headerShown: false,
                    animationEnabled: false,
                    tabBarIcon: ()=> (
                        <MaterialCommunityIcons name="account" size={25} />
                    )
                }}
            >
            </BottomTab.Screen>
       

        </BottomTab.Navigator>
    )
}

const Auth = () => {
    return (
      <LogStack.Navigator>
        {/*<Stack.Screen*/}
        {/*  name="Logout"*/}
        {/*  component={LogoutScreen}*/}
        {/*  options={{headerShown: false}}*/}
        {/*/>*/}

        <LogStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: '',
            headerBackTitleVisible: false,
          }}
        />

        <LogStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: '',
            headerBackTitleVisible: false,
          }}
        />

        {/* 구매자, 판매자 구별 */}
        <LogStack.Screen
        name="EnterType"
        component={EnterType}
        options={{
          title: '',
          headerBackTitleVisible: false,
        }}
        />

        {/* 이름입력 */}
        <LogStack.Screen
        name="EnterName"
        component={EnterName}
        options={{
          title: '',
          headerBackTitleVisible: false,
        }}
        />

        {/* 이메일입력 */}
        <LogStack.Screen
        name="EnterEmail"
        component={EnterEmail}
        options={{
          title: '',
          headerBackTitleVisible: false,
        }}
        />

        {/* 비밀번호입력 */}
        <LogStack.Screen
        name="EnterPassword"
        component={EnterPassword}
        options={{
          title: '',
          headerBackTitleVisible: false,
        }}
        />

        {/* 비밀번호 확인 */}
        <LogStack.Screen
        name="PasswordCheck"
        component={PasswordCheck}
        options={{
          title: '',
          headerBackTitleVisible: false,
        }}/>





      </LogStack.Navigator>
    );
};



function Navigator() {

    return (

        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                // Hiding header for Splash Screen
                options={{headerShown: false}}
                />

                <Stack.Screen
                    name="Auth"
                    component={Auth}
                    options={{headerShown: false}}
                />
                
                {/* <Stack.Screen
                name="MainLog"
                component={MainLog}
                options={{headerShown: false}}
                /> */}

                <Stack.Screen 
                name="BottomNav"
                component={BottomNavigation}
                options={{
                    headerShown: false,
                    animationEnabled: false
                }}/>

                
   
            </Stack.Navigator>
            
        </NavigationContainer>
    )
}

export default Navigator;