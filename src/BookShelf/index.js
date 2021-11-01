import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'react-native';
import BookShelfHome from './BookShelfComponent/BookShelfHome';

const Stack = createStackNavigator();


function BookShelf ({navigation}) {

    return (
        <Stack.Navigator>
            <Stack.Screen
            name="BookShelfHome"
            component={BookShelfHome}
            options={{
                title: '노제원님의 책장'
            }}/>
            
        </Stack.Navigator>
    )
}


export default BookShelf;