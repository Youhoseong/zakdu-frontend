import React, {useState} from 'react';
import {View, Text, Pressable, useWindowDimensions, TextInput} from 'react-native';
import {responsiveScreenFontSize, responsiveScreenWidth, responsiveScreenHeight} from 'react-native-responsive-dimensions';
import Animation from 'lottie-react-native';
import HeaderBackButton from '../../../Common/CommonComponent/HeaderBackButton';
import { parse } from '@babel/core';


function BookPriceView({navigation, route}) {
    const {fileObj} = route.params;

    const [bookRegisterObj, setBookRegisterObj] = useState(fileObj);
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
                <View style={{  marginTop: '20%', width: '100%', height: '10%'}}>
                    
                    <Text style={{ fontSize: responsiveScreenFontSize(1.5), fontWeight: '700', textAlign: 'center'}}>
                        마지막이에요.    
                    </Text>

                    <Text style={{marginTop: 10, fontSize: responsiveScreenFontSize(1.1), fontWeight: '500',textAlign: 'center'}}>
                        전체 도서의 가격은 어떻게 할까요?        
                    </Text>
                  

                </View>
                <Animation
                style={{width: 300,  height: 400, position: 'absolute'}}
                source={require('../../../Assets/json/67938-money-confetti.json')} 
                autoPlay
                resizeMode= 'cover'/>



                <View style={{
                    marginTop: '35%',
                    width: '100%',
                    height: '8%',
                    display: 'flex',
                    flexDirection: 'row',
            
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>              
                    <TextInput 
                            style={{
                                width: '100%',
                                height: '100%',
                                borderBottomColor: 'gray',
                                borderBottomWidth: 3,
                                fontSize: responsiveScreenFontSize(1.5),
                                marginHorizontal: '5%'
                            }}
                            onChangeText={(text)=> {
                                console.log(text);
                                text = text.replaceAll(",", "");
                                text = text.replaceAll("₩", "");

                                if(!isNaN(text) && Number.isInteger(parseInt(text))){
                                    console.log(text);
                                    setBookRegisterObj({
                                        ...bookRegisterObj,
                                        ["bookPrice"]: parseInt(text)
                                    });
 
                                }
                                if(text === "") {
                                    setBookRegisterObj({
                                        ...bookRegisterObj,
                                        ["bookPrice"]: ""
                                    });
                                    //setPriceString("")
                                }
                                
                            }}
                            value={bookRegisterObj.bookPrice === "" ? "" : bookRegisterObj.bookPrice.toLocaleString("ko-KR", { style: 'currency', currency: 'KRW' })}
                            placeholder=""
                            keyboardType="numeric"
                            
                           // placeholder="도서 가격을 입력해 주세요."
                    />



                </View>
 
                <Pressable 
                            disabled= {bookRegisterObj.bookPrice === "" ? true : false}
                            style={({pressed})=>[
                            {
                               backgroundColor: 
                               bookRegisterObj.bookPrice === "" ? 'gray' : 'blue'
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
                           >
                        
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
export default BookPriceView;