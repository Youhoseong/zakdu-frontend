import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import {Button, StyleSheet, View, Text,Props} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';


function Profiles({route, navigation}) {
    const [name, setName] = React.useState('');
    const {originname} = route.params;

    return (
        <View style={styles.container}>
            <Text>프로필 변경 페이지</Text>
            <TextInput
                style={styles.input}
                placeholder={originname}
                value={name}
                onChangeText={name => setName(name)}
            />
            <Button
                title="변경"
                onPress={() => navigation.navigate('MyPageHome',{name:name})}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        alignItems:'center'
    },
    input: {
      margin: 15,
      height: 40,
      width: '40%',
      borderColor: "#7a42f4",
      borderWidth: 1
    },

  });

export default Profiles;