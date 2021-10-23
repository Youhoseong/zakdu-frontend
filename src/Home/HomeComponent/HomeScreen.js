import { NavigationAction } from '@react-navigation/routers';
import React from 'react';
import {Button, View, Text} from 'react-native';





function HomeScreen({navigation}) {

    return (
        <View >
            <Text>Home Screddden</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Test')}
            />

        </View>
    );
}

export default HomeScreen;