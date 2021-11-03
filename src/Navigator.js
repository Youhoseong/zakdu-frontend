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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const Placeholder = Styled.View`
  
`;


const TabPlaceholder = () => {
  return <Placeholder>
            <Text>This is Temp Page.</Text>
        </Placeholder>;
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


function Navigator() {


    return (

        <NavigationContainer>
            <Stack.Navigator>
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