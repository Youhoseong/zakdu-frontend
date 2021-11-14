import React, {useState} from 'react';
import {View, Text, Pressable, useWindowDimensions} from 'react-native';

import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import Animation from 'lottie-react-native';
import HeaderBackButton from '../../Common/CommonComponent/HeaderBackButton';


 function BookRegisterLandingView ({navigation}) {
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
        <View style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            backgroundColor: 'white'
        }}>
      
                <View style={{
                    width:  width > height ? '30%': '50%',
                    height: width > height ? '100%': '80%',
                    alignItems: 'center',
                
                }}>
                    <View style={{  
                        marginTop: 100,       
                        width: '100%',        
                    }}>
                        <Text 
                        style={{
                            fontSize: responsiveScreenFontSize(1.5),
                            fontWeight: '500'
                        }}>
                            작두의 간편한
            
                        </Text>
                        <Text 
                        style={{
           
                            fontSize: responsiveScreenFontSize(1.5),
                            fontWeight: '500'
                        }}>
                            도서 등록 서비스를 사용해보세요.
                        </Text>
                        <Text 
                        style={{
                            marginTop : 12,
                            fontSize: responsiveScreenFontSize(1.2),
                            fontWeight: '100'
                        }}>
                            목차를 기반으로 도서를 자동 분할 합니다.
                        </Text>


                    </View>
                    <Animation
                                style={{
                                    marginTop: 30,
                                    width: 300, 
                                    height: 300,
                                }}
                                source={require('../../Assets/json/28893-book-loading.json')} 
                                autoPlay
                                resizeMode= 'cover'
                    />
                    
                    <Pressable style={({pressed})=>[
                            
                        {
                            backgroundColor: pressed ? '#2A3AC4' : '#3448F3',
                        }, 
                        {
                            width: '100%',
                            height: width > height ? responsiveScreenHeight(6) : responsiveScreenWidth(6),
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 100,
                            borderRadius: 30,
                            //backgroundColor: '#3448F3'
                        }
                    ]}
                        onPress={()=> {
                            navigation.push('BookRegisterFileUpload')
                        }}
                    >

                        <Text 
                        style={{
                            color: 'white',
                            fontSize: responsiveScreenFontSize(1.0)
                        }}>
                            시작하기
                        </Text>
                    </Pressable>
                </View>
{/*              
                <View style={{
                    width: '100%',
                    height: responsiveScreenHeight(6),
                    alignItems: 'center',
                    marginTop: 30,
                 //   borderWidth: 1
                }}>

                    <View style={{
                        width: '40%',
                        height: '100%',
                        backgroundColor: '#E8E8E8',
                        borderRadius: 15,
                        //borderWidth: 1
                    }}>
                        {pdfFile === null ? 
                        <View style={{height: '100%', justifyContent: 'center', paddingLeft: 15}}>
                            <Text>
                                파일을 선택해주세요.
                            </Text> 

                            <Pressable 
                                style={{
                                    position: 'absolute',
                                    right: 5,
                                    justifyContent: 'center',
                                    height: '100%'
                                }}
                                onPress={() => filePicker()}>
                                    <MaterialCommunityIcons name="plus-circle" size={27}/>
                            </Pressable>
                        </View> :
                            <View style={{height: '100%', justifyContent: 'center', paddingLeft: 15}}>

                                <Text>{pdfFile.name}</Text>

                                <Pressable 
                                    style={{
                                        position: 'absolute',
                                        right: 5,
                                        justifyContent: 'center',
                                        height: '100%'
                                    }}
                                    onPress={() => setPdfFile(null)}>
                                        <MaterialCommunityIcons name="minus-circle" size={27} color= '#F36B6B'/>
                                </Pressable>
                            </View>
                        }
                
                    </View>

                    {pdfFile != null ?
                    
                    <View style={{
                        width: '100%',
                        height: responsiveScreenHeight(6),
                        alignItems: 'center',
                        marginTop: 30,
                    //    borderWidth: 1
                    }}>
                        <View  style={{
                                width: '40%',
                                height: '100%',
                                backgroundColor: '#E8E8E8',
                                borderRadius: 15,
                                //borderWidth: 1,
                                paddingHorizontal: 10,
                               // justifyContent: 'center',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                                
                            }}>

                        <TextInput 
                            style={{
                                height: '100%',
                                width: '100%',
                            }}
                            placeholder="책 제목을 입력해주세요."
                            placeholderTextColor="black"
                            onChange={(e)=> {
                                if(e.nativeEvent.text)
                                    setBookTitle(e.nativeEvent.text);
                                else
                                    setBookTitle(null);
                                console.log(e.nativeEvent.text);
                            }}
                            onSubmitEditing={(e)=> {
                                setBookTitle(e.nativeEvent.text);
                            }}
                            >
                        </TextInput>

                        {bookTitle != null ? 
                                          
                            <Animation
                                style={{
                                    width: 30, 
                                    height: 30,
                                    position: 'absolute',
                                    right: 1

                                }}
                                source={require('../../Assets/json/782-check-mark-success (1).json')} 
                                autoPlay
                                loop={false}
                                resizeMode= 'cover'
                        /> : null}
                        </View>
     
                    </View> : null }


                    {pdfFile != null && bookTitle != null ?
                    
                    <View style={{
                        width: '100%',
                        height: responsiveScreenHeight(6),
                        alignItems: 'center',
                        marginTop: 30,
                       // borderWidth: 1
                    }}>
                        <View  style={{
                                width: '40%',
                                height: '100%',
                                backgroundColor: '#E8E8E8',
                                borderRadius: 15,
                                //borderWidth: 1,
                                paddingHorizontal: 10,
                               // justifyContent: 'center',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                                
                            }}>

                        <TextInput 
                            style={{
                                height: '100%',
                                width: '100%',
                            }}
                            placeholder="책 가격을 입력해주세요."
                            placeholderTextColor="black"
                            onChange={(e)=> {
                                if(e.nativeEvent.text) {
                                    if (/^\d+$/.test(e.nativeEvent.text)) { 
                                        setBookPrice(e.nativeEvent.text);
                                    }
                                }
                                    
                                else
                                    setBookPrice(null);
                                console.log(e.nativeEvent.text);
                            }}
                            onSubmitEditing={(e)=> {
                                setBookPrice(e.nativeEvent.text);
                            }}
                            keyboardType="numeric"
                            >
                        </TextInput>

                        {bookPrice != null ? 
                                          
                            <Animation
                                style={{
                                    width: 30, 
                                    height: 30,
                                    position: 'absolute',
                                    right: 1

                                }}
                                source={require('../../Assets/json/782-check-mark-success (1).json')} 
                                autoPlay
                                loop={false}
                                resizeMode= 'cover'
                        /> : null}
                        </View>
     
                    </View> : null }

                 </View> */}

           

          
        </View>


    );



}

export default BookRegisterLandingView;