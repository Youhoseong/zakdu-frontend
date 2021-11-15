import React, {useState} from 'react';
import {View, Text, Pressable, useWindowDimensions, TextInput, StyleSheet} from 'react-native';
import {responsiveScreenFontSize, responsiveScreenWidth, responsiveScreenHeight} from 'react-native-responsive-dimensions';
import Animation from 'lottie-react-native';
import HeaderBackButton from '../../../Common/CommonComponent/HeaderBackButton';
import RNPickerSelect from 'react-native-picker-select';
import { registerBook } from '../../../Store/Actions';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
    inputIOS: {
        fontSize: responsiveScreenFontSize(1),
        height: '100%', 
        width: '100%',

    },
})

function BookCategoryView({navigation, handleBookCategory, bookCategory}) {
    const {width, height} = useWindowDimensions();

    React.useLayoutEffect(() => {     
        navigation.setOptions({       
            headerStyle: {
                backgroundColor: 'white',
            },
            headerLeft: ()=> {
                return(
                    <HeaderBackButton navigation={navigation}/>
                );
            },
        });   
    }, [navigation]);

    return (
        <View style={{width: '100%', height: '100%', alignItems: 'center', backgroundColor: 'white'}}>
            <View style={{ 
                width: width > height ? '30%' : '50%',
                height: width > height ? '100%' : '80%',
                alignItems: 'center',
               // borderWidth: 1
            }}>
                <View style={{  marginTop: '30%', width: '100%', height: '10%'}}>
                    
                    <Text style={{ fontSize: responsiveScreenFontSize(1.4), fontWeight: '700', textAlign: 'center'}}>
                        분할 판매를 위한 분석은 끝났어요.     
                    </Text>

                    <Text style={{marginTop: 10, fontSize: responsiveScreenFontSize(1.1), fontWeight: '500',textAlign: 'center'}}>
                        도서 정보가 필요합니다.        
                    </Text>
                    <Text style={{marginTop: 5, fontSize: responsiveScreenFontSize(1.1), fontWeight: '500', textAlign: 'center'}}>
                        도서 카테고리를 선택해 주세요.  (1/8)   
                    </Text>
                  

                </View>

                <Animation
                        style={{width: 300,  height: 200}}
                        source={require('../../../Assets/json/81757-leaf.json')} 
                        autoPlay
                        resizeMode= 'cover'/>

                <View style={{
                    width: '100%',
                    height: '10%',
                    display: 'flex',
                    flexDirection: 'row',
                    borderWidth:1,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                <RNPickerSelect
                    onValueChange={(value)=> {
                        console.log(value);
                        if(value === null) {
                            handleBookCategory("")
                        } else {
                            handleBookCategory(value);
                        }
                    }}
                    items={[
                        { label: '전공도서', value: '전공도서' },
                        { label: '문제집', value: '문제집' },
                        { label: '기타', value: '기타' },
                    ]}
                    useNativeAndroidPickerStyle={false}
                    style={styles}



                />

                </View>

                <Pressable 
                            disabled= {!bookCategory ? true : false}
                            style={({pressed})=>[
                            {
                               backgroundColor: 
                               !bookCategory ? 'gray' : 'blue'
                            }, 
                            {
                                shadowOffset :{
                                    width: 3,
                                    height: 2
                                },
                                shadowOpacity: 1,
                                shadowRadius: 4,
                                shadowColor: 'gray',
                                width: '100%',
                                height: width > height ? responsiveScreenHeight(6) : responsiveScreenWidth(6),
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                bottom: 100,
                                borderRadius: 30,
                            
                            }
                        ]}
                            onPress={()=> navigation.push('GetCover')}>
                        
                            <Text 
                                style={{
                                    color: 'white',
                                    fontSize: responsiveScreenFontSize(1.0)
                                }}>
                                완료

                            </Text>
                </Pressable>

            </View>
        </View>
    );

}
const mapDispatchToProps = (dispatch) => ({
    handleBookCategory: (value) => (dispatch(registerBook("bookCategory", value)))
});

const mapStateToProps = (state) => ({
    bookCategory: state.registerBooks.bookRegisterObj.bookCategory,
});

export default connect(mapStateToProps, mapDispatchToProps)(BookCategoryView);