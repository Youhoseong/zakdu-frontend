import React, {useState} from 'react';
import {View, Text, Pressable, useWindowDimensions, TextInput} from 'react-native';
import {responsiveScreenFontSize, responsiveScreenWidth, responsiveScreenHeight} from 'react-native-responsive-dimensions';
import Animation from 'lottie-react-native';
import HeaderBackButton from '../../../Common/CommonComponent/HeaderBackButton';
import { registerBook } from '../../../Store/Actions';
import {connect} from 'react-redux';
import DatePicker from 'react-native-date-picker';

function BookPubDateView({navigation, handleBookPubDate, bookPubDate}) {
    const {width, height} = useWindowDimensions();

    React.useLayoutEffect(() => {     
        console.log(bookPubDate)
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

        

                <View style={{
                    width: '100%',
                    height: '40%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    {/* <TextInput 
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
                                    handleBookPubDate(text);
                                } else {
                                    handleBookPubDate("");
                                }
                                
                            }}
                            
                            placeholder="출판 날짜를 입력해 주세요. (yyyy-mm-dd) "
                    /> */}

                    <DatePicker 
                        locale={"ko-KR"}
                        date={bookPubDate} 
                        onDateChange={handleBookPubDate} 
                        mode="date"
                        maximumDate={new Date()}
                    />


                </View>

                <Pressable 
                            disabled= {!bookPubDate ? true : false}
                            style={({pressed})=>[
                            {
                               backgroundColor: 
                               !bookPubDate ? 'gray' : 'blue'
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
                            onPress={()=> navigation.push('GetIntro')}>
                        
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
const mapDispatchToProps = (dispatch) => ({
    handleBookPubDate: (value) => (dispatch(registerBook("bookPubDate", value)))
});

const mapStateToProps = (state) => ({
    bookPubDate: state.registerBooks.bookRegisterObj.bookPubDate
});
export default connect(mapStateToProps, mapDispatchToProps)(BookPubDateView);