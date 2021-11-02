import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BookRegisterView from './BookRegisterComponent/BookRegisterView';
import BookStores from './BookStoreComponent/BookStores';




const Stack = createStackNavigator();


function BookStore ({navigation}) {

    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="BookShop" 
            options={{
                title: '북스토어',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={BookStores}>
            

            </Stack.Screen>
            <Stack.Screen 
            name="BookRegister" 
            options={{
                title: '책 등록하기',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={BookRegisterView}>
            

            </Stack.Screen>


           

            
            
        </Stack.Navigator>
    )
}


export default BookStore;