import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BookShelfHome from './BookShelfComponent/BookShelfHome';
import ReadingBookView from './BookShelfComponent/ReadingBookView';
import { connect } from 'react-redux';
const Stack = createStackNavigator();




function BookShelf({user_info}){

    return (
        <Stack.Navigator>
            <Stack.Screen
            name="BookShelfHome"
            component={BookShelfHome}
            options={{
                title: user_info.username + " 님의 책장",
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
const mapStateToProps = (state) => ({
    user_info : state.userReducer.userObj
  });

export default connect(mapStateToProps)(BookShelf);
