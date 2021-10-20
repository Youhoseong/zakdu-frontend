import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'react-native';
import HomeScreen from './HomeComponent/HomeScreen';
import Test from './HomeComponent/Test';

const Stack = createStackNavigator();

function HomeCmp({navigation}) {
    return (
        <HomeScreen/>

    )

}


function Home ({navigation}) {

    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="HomeScreen" 
            component={HomeScreen}
            options={{
                title: '읽고 있는 책'
            }}/>

            <Stack.Screen 
            name="Test" 
            component={Test}
            options={{
                title: '테스트입니닷'
            }} />
            
        </Stack.Navigator>
    )
}


export default Home;