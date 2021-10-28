import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import BookStoreTest from './BookStoreComponent/BookStoreTest';
import DetailBook from './BookStoreComponent/DetailBook';
import PartPurchaseView from './BookStoreComponent/PartPurchaseView';



const Stack = createStackNavigator();


function BookStore ({navigation}) {

    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="BookShop" 
            options={{
                title: '북스토어'
            }}
            component={BookStoreTest}>
            

            </Stack.Screen>


            <Stack.Screen
            name="PartPurchase"
            options={{
                title: '히히'
            }}
            component={PartPurchaseView}
            >
             
            </Stack.Screen>

            
            
        </Stack.Navigator>
    )
}


export default BookStore;