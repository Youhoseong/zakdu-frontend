import React, {useState} from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import {StyleSheet, ScrollView, TouchableOpacity, Button, View, Text, } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



function MyPageHome({navigation}) {
    const [username,setUsername] = useState("");
    const [point,setPoint] = useState("");

    AsyncStorage.getItem('user_information', (err, result) => {
        const UserInfo = JSON.parse(result);
        setUsername(UserInfo.user_name);    
        setPoint(UserInfo.user_point);    
    });
    const originname='';
    return (
        <View style={styles.mainView} >
            <TouchableOpacity 
                style={styles.profiles}
                onPress={() => navigation.navigate('Profiles',{originname:username})} 
            >
                {/* 이미지 삽입 */}
                <Text
                    style={styles.mainText}
                >
                    {username}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    ...styles.innerView, 
                    alignItems:'center', 
                    flexDirection:'row', 
                    justifyContent:'center',
                }}
            >
                <Text style={{...styles.text, flex:1}}>잔여 포인트</Text>
                <Text style={{...styles.text, flex:1, textAlign:'right', paddingRight:20}}>{point} P</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.innerView}
                onPress={() => navigation.navigate('PersonalInfo',{originname:username})}
            >
                <Text style={styles.text}>개인정보 설정</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.innerView}
                onPress={() => navigation.navigate('PurchaseHistory')}
            >
                <Text style={styles.text}>구매 내역</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.innerView}
                onPress={() => navigation.replace('Auth')}
            >
                <Text style={styles.text}>로그 아웃</Text>
            </TouchableOpacity>
            
            
            

        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flex:1,
        alignItems: 'center',
        //justifyContent: 'center'
    },
    profiles: {
        flex:4,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainText: {
        fontSize:30
    },
    innerView: {
        flex:1,
        width:'100%',
        borderTopWidth: 1,
        borderTopColor: 'black',
        justifyContent: 'center',
        alignItems:'flex-start'
    },
    text: {
        marginLeft:20,
        fontSize:20
    }
})
export default MyPageHome;