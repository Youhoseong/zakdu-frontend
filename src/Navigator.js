import React from 'react';
import {View, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home/index';
import Test from './Home/HomeComponent/Test';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Styled from 'styled-components';


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
            <BottomTab.Screen
                name="ReadingBook"
                component={Home}
                options={{
                    tabBarLabel: "읽고 있는 책",
                    headerShown: false,
                    animationEnabled: false
                 
                }}
            >
            </BottomTab.Screen>
            <BottomTab.Screen
                name="BookShelf"
                component={TabPlaceholder}
                options={{
                    tabBarLabel: '보관함',
                    headerShown: false,
                    animationEnabled: false
                }}
            >
            </BottomTab.Screen>
            <BottomTab.Screen
                name="BookStore"
                component={TabPlaceholder}
                options={{
                    tabBarLabel: '북스토어',
                    headerShown: false,
                    animationEnabled: false
                }}
            >
            </BottomTab.Screen>
            <BottomTab.Screen
                name="MyPage"
                component={TabPlaceholder}
                options={{
                    tabBarLabel: '마이페이지',
                    headerShown: false,
                    animationEnabled: false
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