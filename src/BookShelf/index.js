import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BookShelfHome from './BookShelfComponent/BookShelfHome';
import ReadingBookView from './BookShelfComponent/ReadingBookView';

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
            name="ReadingBook" 
            component={ReadingBookView}
            options={{
                title: '읽고 있는 책',
                
                
            }}
            
            />
            
        </Stack.Navigator>
    )
}


export default BookShelf;
