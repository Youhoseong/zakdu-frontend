import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import BookShelfHome from './BookShelfComponent/BookShelfHome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeScreen from './BookShelfComponent/ReadingBookView';

const Stack = createStackNavigator();




function BookShelf () {

    return (
        <Stack.Navigator>
            <Stack.Screen
            name="BookShelfHome"
            component={BookShelfHome}
            options={{
                title: '노제원님의 책장'
            }}/>
            <Stack.Screen 
            name="HomeScreen" 
            component={HomeScreen}
            options={{
                title: '읽고 있는 책',
                
                
            }}
            
            />
            
        </Stack.Navigator>
    )
}


export default BookShelf;
