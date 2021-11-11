import { useWindowDimensions } from 'react-native';
import {responsiveScreenFontSize, responsiveScreenWidth, responsiveScreenHeight} from 'react-native-responsive-dimensions';
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Animation from 'lottie-react-native';


function BookmarkEmptyView({bookRegisterObj, navigation}) {
    const {width, height} = useWindowDimensions();
    return (
        <View style={{ 
            width: width > height ? '30%' : '50%',
            height: width > height ? '100%' : '80%',
            alignItems: 'center',
        }}>
            
            <View style={{  marginTop: 100, width: '100%', height: '20%'}}>
                
                <Text style={{ fontSize: responsiveScreenFontSize(1.5), fontWeight: '700'}}>
                    텅.     
                </Text>

                <Text style={{marginTop: 10, fontSize: responsiveScreenFontSize(1.3), fontWeight: '500',}}>
                    내장된 목차를 찾을 수 없어요.           
                </Text>
            </View>
            <Animation
                    style={{width: 300,  height: 300}}
                    source={require('../../../Assets/json/8021-empty-and-lost.json')} 
                    autoPlay
                    resizeMode= 'cover'/>

            <Pressable 
                style={({pressed})=>[
                {
                    backgroundColor: pressed ? '#2A3AC4' : '#3448F3',
                    width: '100%',
                    height: width > height ? responsiveScreenHeight(6) : responsiveScreenWidth(6),
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 100,
                    borderRadius: 30,
                }
            ]}
                onPress={()=> navigation.push('GetBookTitle', {
                    'fileObj': bookRegisterObj
                })}
            >
            
                <Text style={{color: 'white',fontSize: responsiveScreenFontSize(1.0)}}>
                    다음 단계
                </Text>
            </Pressable>
        </View>
    );
}
export default BookmarkEmptyView;