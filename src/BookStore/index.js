import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'react-native';
import DetailBook from './BookStoreComponent/DetailBook';


const Stack = createStackNavigator();


function BookStore ({navigation}) {

    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="DetailBook" 
            options={{
                title: '자세한 내용'
            }}>
                {()=> <DetailBook bookId={2}/>}
            </Stack.Screen>

            
            
        </Stack.Navigator>
    )
}


export default BookStore;