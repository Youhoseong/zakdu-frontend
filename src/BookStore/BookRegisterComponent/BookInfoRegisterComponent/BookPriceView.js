import React, {useState} from 'react';
import {View, Text, Pressable, useWindowDimensions, TextInput} from 'react-native';
import {responsiveScreenFontSize, responsiveScreenWidth, responsiveScreenHeight} from 'react-native-responsive-dimensions';
import Animation from 'lottie-react-native';
import HeaderBackButton from '../../../Common/CommonComponent/HeaderBackButton';
import { parse } from '@babel/core';
import { registerBook } from '../../../Store/Actions';
import {connect} from 'react-redux';
import axios from 'axios';
import {HS_API_END_POINT} from '../../../Shared/env';
function BookPriceView({navigation, handleBookPrice, bookPrice, bookObject}) {

    const {width, height} = useWindowDimensions();
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const onPressRegisterBook = () => {
        const formData = new FormData();
        setSubmitDisabled(true);
        let bookRegisterDto = {
            category: bookObject.bookCategory,
            'name': bookObject.bookName,
            "author": bookObject.bookAuthor,
            'publisher': bookObject.bookPublisher,
            "pubDate": bookObject.bookPubDate,
            "intro": bookObject.bookIntro,
            "price": bookObject.bookPrice,
            "realStartPage": bookObject.bookRealFirstTocPage,
            'tocResult': bookObject.bookTocResult,       
        }

        let bookFile = {
            name: bookObject.bookFile.name,
            type: bookObject.bookFile.type,
            uri: bookObject.bookFile.uri
        }

        let bookCover = {
            name: bookObject.bookCover.fileName,
            type: bookObject.bookCover.type,
            uri: bookObject.bookCover.uri    
        }

        formData.append('bookRegisterDto', JSON.stringify(bookRegisterDto));
        formData.append('bookFile', bookFile);
        formData.append('bookCover', bookCover);
        

        axios.post(`${HS_API_END_POINT}/book/test2`, formData ,{
            headers: {
                    //'Content-Type': 'multipart/form-data'
            },
        }).then((res)=> {
            setSubmitDisabled(false);
        }).catch((err)=> {
            setSubmitDisabled(false);
            console.error(err);
        })
    }

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
                                    handleBookPrice(parseInt(text));
                                }
                                if(text === "") {
                                    handleBookPrice("");
                                }
                                
                            }}
                            value={!bookPrice? "" : bookPrice.toLocaleString("ko-KR", { style: 'currency', currency: 'KRW' })}
                            placeholder=""
                            keyboardType="numeric"
                            
                           // placeholder="도서 가격을 입력해 주세요."
                    />



                </View>
 
                <Pressable 
                            disabled= {!bookPrice || submitDisabled ? true : false}
                            style={({pressed})=>[
                            {
                               backgroundColor: 
                               !bookPrice || submitDisabled ? 'gray' : 'blue'
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
                        onPress={()=> onPressRegisterBook()}
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

const mapDispatchToProps = (dispatch) => ({
    handleBookPrice: (value) => (dispatch(registerBook("bookPrice", value)))
});

const mapStateToProps = (state) => ({
    bookObject: state.registerBooks.bookRegisterObj,
    bookPrice: state.registerBooks.bookRegisterObj.bookPrice
});

export default connect(mapStateToProps, mapDispatchToProps)(BookPriceView);