import { Text, View, useWindowDimensions, StyleSheet, TextInput, Pressable,ScrollView, Image } from "react-native";
import React, {useState} from 'react';
import HeaderBackButton from "../../../Common/CommonComponent/HeaderBackButton";
import { responsiveScreenFontSize, responsiveScreenWidth, responsiveScreenHeight } from "react-native-responsive-dimensions";
import Animation from 'lottie-react-native';
import { registerBook } from "../../../Store/Actions";
import {connect} from 'react-redux';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {HS_API_END_POINT} from '../../../Shared/env';

let parseString = require('react-native-xml2js').parseString;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        
    },

    button: {
        marginTop: '5%',

        width: '85%',
        height: '10%',

        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 8,
    },

    bookInfoText : {         
        width: '95%',
        marginHorizontal: '1%',                    
        color: 'white',
        fontWeight: '600',
        fontSize: responsiveScreenFontSize(0.9)
    }
});


const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
    if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
            return;
        }
        seen.add(value);
    }
    return value;
    };
};

const BookInfoComponent = ({content}) => {
    return (
        <View style={{
            marginVertical: '5%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={20} color="white"/>
            <Text
                numberOfLines={1} 
                style={styles.bookInfoText}>
                {content}
            </Text>
        </View>
    );
}


function NaverAPISearchResult({navigation, bookISBN, handleISBN, bookObj}) {

    const {width, height} = useWindowDimensions();
    const [submit, setSubmit] = useState(false);
    const formattedPubDate = bookObj.bookPubDate.substring(0,4) + "년 " + 
                            bookObj.bookPubDate.substring(4,6) + "월 " + 
                            bookObj.bookPubDate.substr(6) + "일";
    
    const onPressRegisterBook = () => {
        const formData = new FormData();
        setSubmit(true);

        let bookRegisterDto = {
            'category': bookObj.bookCategory,
            'name': bookObj.bookName,
            "author": bookObj.bookAuthor,
            'publisher': bookObj.bookPublisher,
            "pubDate": new Date(bookObj.bookPubDate.substring(0,4), parseInt(bookObj.bookPubDate.substring(4,6))-1, parseInt(bookObj.bookPubDate.substr(6))),
            "intro": bookObj.bookIntro,
            "price": bookObj.bookPrice,
            "realStartPage": bookObj.bookRealFirstTocPage,
            'tocResult': bookObj.bookTocResult,       
        }

        let bookFile = {
            name: bookObj.bookFile.name,
            type: bookObj.bookFile.type,
            uri: bookObj.bookFile.uri
        }

        let bookCover = {
            name: bookObj.bookCover.fileName,
            type: bookObj.bookCover.type,
            uri: bookObj.bookCover.uri    
        }

        formData.append('bookRegisterDto', JSON.stringify(bookRegisterDto, getCircularReplacer()));
        formData.append('bookFile', bookFile);
        formData.append('bookCover', bookCover);
        

        axios.post(`${HS_API_END_POINT}/book/test2`, formData ,{
            headers: {
                    //'Content-Type': 'multipart/form-data'
            },
        }).then((res)=> {
            setSubmit(false);
            navigation.replace('BookShop');
        }).catch((err)=> {
            setSubmit(false);
            navigation.push('RegisterFail');
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
        <View style={styles.container}>
            <View style={{ 
                width: width > height ? '30%' : '50%',
                height: width > height ? '100%' : '80%',
                alignItems: 'center',
            }}>
                <View style={{  marginTop: '20%', width: '100%', height: '10%'}}>
                    
                    <Text style={{ fontSize: responsiveScreenFontSize(1.5), fontWeight: '700', textAlign: 'center'}}>
                     작두 봇이 열심히 일했어요.
                    </Text>

                    <Text style={{marginTop: 10, fontSize: responsiveScreenFontSize(1.1), fontWeight: '500', textAlign: 'center'}}>
                       도서 조회 결과입니다.  
                    </Text>
                  

                </View>
                <Animation
                style={{width: 300,  height: 300, marginVertical: '2%', position: 'absolute'}}
                source={require('../../../Assets/json/50515-congratulations.json')} 
                autoPlay
                resizeMode= 'cover'/>



                <View style={{
                    marginTop: '5%',
                    width: '100%',
                    height: '70%',
                    shadowColor: 'gray',
                    shadowOffset: {
                        width: 3,
                        height:2
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                    alignItems: 'center',
                    borderRadius: 16,
                    backgroundColor: '#314DFE',
                    
                }}> 
                    <View style={{  
                        marginTop: '3%',
                        width: '85%',
                        height: '10%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text
                                numberOfLines={1}
                                style={{      
                                    width: '100%',   
                                    marginHorizontal: '1%',                    
                                    color: 'white',
                                    fontWeight: '600',
                                    fontSize: responsiveScreenFontSize(1.1)
                                }}>
    
                            {bookObj.bookName}
                        </Text>
                    </View>
                    <View style={{
                        marginTop: '3%',
                        width: '80%',
                        height: '70%',


                    }}>
                        
                        <ScrollView style={{width: '100%'}}>
                            <BookInfoComponent content={"카테고리: "+ bookObj.bookCategory} />
                            <BookInfoComponent content={bookObj.bookAuthor + " 지음"} />
                            <BookInfoComponent content={"가격: " + parseInt(bookObj.bookPrice).toLocaleString("ko-KR", { style: 'currency', currency: 'KRW' })} />                           
                            <BookInfoComponent content={"출판사: " + bookObj.bookPublisher}/>
                            <BookInfoComponent content={"출판일: "+ formattedPubDate} />
                            <BookInfoComponent content={"설명: "} />  
                            <View style={{
                                marginTop: '3%',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',

                            }}>
         
                                <Text style={styles.bookInfoText}>
                                    {bookObj.bookIntro}
                                </Text>
                            </View>
                        </ScrollView>


                    </View>


                   <Pressable 
                            disabled= {!submit ? false : true}
                            style={({pressed})=>[
                                styles.button,
                                {
                                backgroundColor: 
                                !submit  ? '#0019B1' : '#001282',
                                height: width > height ? responsiveScreenHeight(6) : responsiveScreenWidth(6),
                                }, ]}
                            onPress={()=> onPressRegisterBook()}
                            >

                            {!submit ?      
                                <Text 
                                    style={{
                                        color: 'white',
                                        fontSize: responsiveScreenFontSize(1.0)
                                    }}>
                                    등록하기

                                </Text> : 

                                <Text 
                                style={{
                                    color: 'white',
                                    fontSize: responsiveScreenFontSize(1.0)
                                }}>
                                등록중...

                                </Text>
                            }
                    </Pressable> 

                </View>
 

            </View>
        </View>

    );
}

const mapStateToProps = (state) => ({
    bookISBN : state.registerBooks.bookRegisterObj.bookISBN,
    bookObj : state.registerBooks.bookRegisterObj
});

const mapDispatchToProps = (dispatch) => ({
    handleISBN: (value) => dispatch(registerBook("bookISBN", value))
});

export default connect(mapStateToProps, mapDispatchToProps)(NaverAPISearchResult);