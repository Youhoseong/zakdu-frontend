import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Test from './HomeComponent/Test';

const Stack = createStackNavigator();



function Home ({navigation}) {



    return (
        <Stack.Navigator>
            
            

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