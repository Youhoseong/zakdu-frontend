import React from 'react';
import {Button, View, Text} from 'react-native';

function PersonalInfo({navigation}) {

    return (
        <View>
            <Text> 개인정보 페이지</Text>
            <Button
                title="Go to Details... again"
                onPress={() => navigation.push('PersonalInfo')}
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('MyPageHome')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
            <Button
                title="Go back to first screen in stack"
                onPress={() => navigation.popToTop()}
            />
        </View>
    )


}

export default PersonalInfo;