import { NavigationAction } from '@react-navigation/routers';
import React from 'react';
import {Button, View, Text, useWindowDimensions} from 'react-native';





function HomeScreen({navigation}) {
    const {height, width} = useWindowDimensions();
    return (
        <View >
            <Text>Home Screddden</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Test')}
            />
            <Text>
            {height}  {width}
            </Text>

        </View>
    );
}

export default HomeScreen;