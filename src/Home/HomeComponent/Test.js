import React from 'react';
import {Button, View, Text} from 'react-native';

function Test({navigation}) {

    return (
        <View>
            <Text> This is test view.</Text>
            <Button
                title="Go to Details... again"
                onPress={() => navigation.push('Test')}
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('HomeScreen')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
            <Button
                title="Go back to first screen in stack"
                onPress={() => navigation.popToTop()}
            />
        </View>
    )


}

export default Test;