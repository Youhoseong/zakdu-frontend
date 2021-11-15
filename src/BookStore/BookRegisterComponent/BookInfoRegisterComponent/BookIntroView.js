import React, {useState} from 'react';
import {View, Text, Pressable, useWindowDimensions, TextInput} from 'react-native';
import {responsiveScreenFontSize, responsiveScreenWidth, responsiveScreenHeight} from 'react-native-responsive-dimensions';
import Animation from 'lottie-react-native';
import HeaderBackButton from '../../../Common/CommonComponent/HeaderBackButton';
import { registerBook } from '../../../Store/Actions';
import {connect} from 'react-redux';

function BookIntroView({navigation, handleBookIntro, bookIntro}) {
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
            }}>
                <View style={{  marginTop: '30%', width: '100%', height: '15%'}}>  
                    <Text style={{marginTop: 5, fontSize: responsiveScreenFontSize(1.4), fontWeight: '700', textAlign: 'center'}}>
                        도서의 소개글을 입력해 주세요.        
                    </Text>
                    <Text style={{marginTop: 5, fontSize: responsiveScreenFontSize(1.1), fontWeight: '500', textAlign: 'center'}}>
                            (7/8)      
                    </Text>
                </View>

        
                <View style={{
                    width: '120%',
                    height: '40%',
                    display: 'flex',
                    flexDirection: 'row',
           
                    //alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <TextInput 
                            multiline={true}
                            style={{
                         
                                textAlignVertical:"top",
                                width: '100%',
                                height: '100%',
                                borderColor: 'gray',
                                borderBottomColor: 'gray',
                                borderBottomWidth: 3,
                                fontSize: responsiveScreenFontSize(0.7),
                                marginHorizontal: '5%',
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 15
                            }}
                            onChangeText={(text)=> {
                                if(text) {
                                    handleBookIntro(text);
                                }else {
                                    handleBookIntro("");
                                }
                                
                            }}
                            value={bookIntro}
                            placeholder="소개글을 입력해 주세요."
                    />


                </View>

                <Pressable 
                            disabled= {!bookIntro ? true : false}
                            style={({pressed})=>[
                            {
                               backgroundColor: 
                               !bookIntro ? 'gray' : 'blue'
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
                            onPress={()=> navigation.push('GetPrice')}>
                        
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
    handleBookIntro: (value) => (dispatch(registerBook("bookIntro", value)))
});

const mapStateToProps = (state) => ({
    bookIntro: state.registerBooks.bookRegisterObj.bookIntro
});
export default connect(mapStateToProps, mapDispatchToProps)(BookIntroView);