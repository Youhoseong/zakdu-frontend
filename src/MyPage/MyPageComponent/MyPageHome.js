import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import {StyleSheet, ScrollView, Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

const username = '홍길동';

function MyPageHome({navigation}) {

    return (
        <View style={styles.mainView} >
            <View 
                style={styles.profiles}
            >
                {/* 이미지 삽입 */}
                <Text
                    onPress={() => navigation.navigate('Profiles',{originname:username})} 
                    style={styles.mainText}
                >
                    {username}
                </Text>
            </View>
            <View
                style={styles.innerView}
            >
                <Button
                    title="개인정보 설정"
                    onPress={() => navigation.navigate('PersonalInfo')}
                />
            </View>
            <View
                style={styles.innerView}
            >
                <Button
                title="구매 내역"
                onPress={() => navigation.navigate('PurchaseHistory')}
            />
            </View>
            <View
                style={styles.innerView}
            >
                <Button
                    title="로그아웃"
                //onPress={() => navigation.navigate('Profile')}
                />
            </View>
            
            
            

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
        alignItems: 'center',
        justifyContent: 'center',
        padding:50,
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
    button: {
        marginLeft:50,
    }
})
export default MyPageHome;