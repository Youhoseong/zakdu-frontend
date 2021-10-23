import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import BookStoreTest from './BookStoreComponent/BookStoreTest';



const Stack = createStackNavigator();


function BookStore ({navigation}) {

    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="DetailBook" 
            options={{
                title: '자세한 내용'
            }}>
                {()=> <BookStoreTest />}
            </Stack.Screen>

            
            
        </Stack.Navigator>
    )
}


export default BookStore;