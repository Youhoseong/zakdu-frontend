import React, {useState} from 'react';
import {View, Text, Pressable, useWindowDimensions, TextInput} from 'react-native';
import {responsiveScreenFontSize, responsiveScreenWidth, responsiveScreenHeight} from 'react-native-responsive-dimensions';
import Animation from 'lottie-react-native';
import HeaderBackButton from '../../../Common/CommonComponent/HeaderBackButton';


function BookPubDateView({navigation, route}) {
    const {fileObj} = route.params;
    const {tocResult} = route.params;
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
                <View style={{  marginTop: '20%', width: '100%', height: '15%'}}>
                    
            
                    <Text style={{marginTop: 5, fontSize: responsiveScreenFontSize(1.4), fontWeight: '700', textAlign: 'center'}}>
                        도서의 출판 날짜를 입력해 주세요.        
                    </Text>
                    <Text style={{marginTop: 5, fontSize: responsiveScreenFontSize(1.1), fontWeight: '500', textAlign: 'center'}}>
                        (6/8)     
                    </Text>

                </View>

                <Animation
                        style={{width: 300,  height: 300}}
                        source={require('../../../Assets/json/14663-notifaction-page-loading-page.json')} 
                        autoPlay
                        resizeMode= 'cover'/>

                <View style={{
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
                                fontSize: responsiveScreenFontSize(1.0),
                                marginHorizontal: '5%'
                            }}
                            onChangeText={(text)=> {
                                if(text) {
                                    setBookRegisterObj({
                                        ...bookRegisterObj,
                                        ["bookPubDate"]: text
                                    })
                                }else {
                                    setBookRegisterObj({
                                        ...bookRegisterObj,
                                        ["bookPubDate"]: ""
                                    })
                                }
                                
                            }}
                            
                            placeholder="출판 날짜를 입력해 주세요. (yyyy-mm-dd) "
                    />


                </View>

                <Pressable 
                            disabled= {bookRegisterObj.bookPubDate === "" ? true : false}
                            style={({pressed})=>[
                            {
                               backgroundColor: 
                               bookRegisterObj.bookPubDate === "" ? 'gray' : 'blue'
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
                            onPress={()=> navigation.push('GetIntro', {
                                'fileObj': bookRegisterObj,
                                'tocResult': tocResult
                            })}>
                        
                            <Text 
                                style={{
                                    color: 'white',
                                    fontSize: responsiveScreenFontSize(1.0)
                                }}>
                                다음 단계

                            </Text>
                </Pressable>

            </View>
        </View>
    );


}
export default BookPubDateView;