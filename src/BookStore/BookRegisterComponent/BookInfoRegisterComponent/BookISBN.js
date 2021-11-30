import { Text, View, useWindowDimensions, StyleSheet, TextInput, Pressable } from "react-native";
import React, {useState} from 'react';
import HeaderBackButton from "../../../Common/CommonComponent/HeaderBackButton";
import { responsiveScreenFontSize, responsiveScreenWidth, responsiveScreenHeight } from "react-native-responsive-dimensions";
import Animation from 'lottie-react-native';
import { registerBook } from "../../../Store/Actions";
import {connect} from 'react-redux';
import axios from 'axios';

let parseString = require('react-native-xml2js').parseString;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        
    },

    button: {
        shadowOffset :{
            width: 3,
            height: 2
        },
        marginHorizontal: 10,
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 30,
    }
});


function BookISBN({navigation, bookISBN, handleISBN, handleBookInfo}) {

    const {width, height} = useWindowDimensions();
    const [formattedISBN, setFormattedISBN] = useState("");
    const [submit, setSubmit] = useState(false);

    const [validate, setValidate] = useState("");

    const getNaverBookSearch = () => {

        setSubmit(true);
        axios.get("https://openapi.naver.com/v1/search/book_adv.xml?d_isbn=" + bookISBN, {
            headers: {
                'X-Naver-Client-Id': '_Xy7aHXVRPYygCjxFI5y',
                'X-Naver-Client-Secret': '2Loxa7VDeL'
            }
        }
        ).then((res)=> {
            setValidate("");
            
            parseString(res.data, function(err, result) {
               
                console.log(JSON.parse(JSON.stringify(result)).rss.channel[0].item[0]);
                let bookInfomation = JSON.parse(JSON.stringify(result)).rss.channel[0].item[0];
                handleBookInfo("bookName", bookInfomation.title[0]);
                handleBookInfo("bookAuthor", bookInfomation.author[0]);
                handleBookInfo("bookPrice", bookInfomation.price[0]);
                handleBookInfo("bookPublisher", bookInfomation.publisher[0]);
                handleBookInfo("bookPubDate", bookInfomation.pubdate[0]);
                handleBookInfo("bookIntro", bookInfomation.description[0]);
            })
            setSubmit(false);
            navigation.push('NaverAPIResult');
        }).catch((err)=> {
            setSubmit(false);
            setValidate("유효하지 않거나 등록돼있지 않은 ISBN입니다. 종이책 ISBN을 우선으로 입력해주세요.")
        })

        
    }

    const formatting = () => {
        let result = bookISBN;
        let interrupt = 4;
        while(result.length > interrupt) {
            result =  result.substring(0,interrupt) + '  ' + result.substr(interrupt);
            interrupt +=6;
        }
       return result;
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
                    
                    <Text style={{ fontSize: responsiveScreenFontSize(1.5), fontWeight: '700'}}>
                        도서 ISBN을 입력해주세요.
                    </Text>

               

                    <Text style={{marginTop: 10, fontSize: responsiveScreenFontSize(1.1), fontWeight: '500'}}>
                       작두 봇이 도서 정보를 자동으로 가져옵니다.     
                    </Text>
                  

                </View>
                <Animation
                style={{width: 300,  height: 300, marginVertical: '2%'}}
                source={require('../../../Assets/json/41068-man-filling-a-list.json')} 
                autoPlay
                resizeMode= 'cover'/>



                <View style={{
                    width: '100%',
                    height: '8%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>              
                    <TextInput 
                            style={{
                                width: '100%',
                                height: '100%',
                                borderBottomColor: !validate ? 'gray' : 'red',
                                borderBottomWidth: 3,
                                fontSize: responsiveScreenFontSize(1.5),
                                marginHorizontal: '5%'
                            }}
                            onChangeText={(text)=> {
                                text = text.replaceAll(" ", "");
                                //text = text.replaceAll("  ", "");

                                if(text.length <= 13 && !isNaN(text) && Number.isInteger(parseInt(text))){          
                                    handleISBN(text);
                                    setFormattedISBN(text);
                                }

                                if(text.length == 0) {
                                    handleISBN("");
                                    setFormattedISBN("");
                                }
                                
                            }}
                            value={!bookISBN? "" : formatting()}
                            placeholder=""
                            keyboardType="numeric"
                            placeholder="13자리 혹은 10자리를 입력하세요"
                    />
                    {!validate ? null : <Text style={{marginTop: 8, color: 'red'}}>{validate}</Text> }

                </View>
                <View style={{
                    width: '100%', 
                    position: 'absolute',
                    bottom: 100,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <Pressable 
                                disabled= {bookISBN.length >= 10 && !submit ? false : true}
                                style={({pressed})=>[
                                    styles.button,
                                    {
                                    width: !validate ?  '100%' : '45%',            
                                    backgroundColor: 
                                    bookISBN.length >= 10 && !submit  ? 'blue' : 'gray',
                                    height: width > height ? responsiveScreenHeight(6) : responsiveScreenWidth(6),
                                    }, ]}
                                onPress={()=> getNaverBookSearch()}>
                                        
                                <Text 
                                    style={{
                                        color: 'white',
                                        fontSize: responsiveScreenFontSize(1.0)
                                    }}>
                                    완료
                                </Text>
                    </Pressable>
                    {validate ? 
                        <Pressable 
                                    disabled= {bookISBN.length >= 10 && !submit ? false : true}
                                    style={({pressed})=>[
                                        styles.button,
                                        {
                                        width: !validate ?  '100%' : '45%',
                                        
                                        backgroundColor: 
                                        bookISBN.length >= 10 && !submit  ? 'blue' : 'gray',
                                        height: width > height ? responsiveScreenHeight(6) : responsiveScreenWidth(6),
                                        }, ]}
                                    onPress={()=> navigation.push('GetName')}>
                                            
                                    <Text 
                                        style={{
                                            color: 'white',
                                            fontSize: responsiveScreenFontSize(1.0),
                                      
                                        }}>
                                        수동 등록
                                    </Text>
                        </Pressable> : null
                    }
                </View>
            </View>
        </View>

    );
}

const mapStateToProps = (state) => ({
    bookISBN : state.registerBooks.bookRegisterObj.bookISBN
});

const mapDispatchToProps = (dispatch) => ({
    handleISBN: (value) => dispatch(registerBook("bookISBN", value)),
    handleBookInfo: (key,value) => dispatch(registerBook(key,value))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookISBN);