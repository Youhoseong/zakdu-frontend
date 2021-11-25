import React, {useState} from 'react';
import {View, Text, Pressable, useWindowDimensions, Image,StyleSheet} from 'react-native';
import {responsiveScreenFontSize, responsiveScreenWidth, responsiveScreenHeight} from 'react-native-responsive-dimensions';
import HeaderBackButton from '../../../Common/CommonComponent/HeaderBackButton';
import { registerBook } from '../../../Store/Actions';
import {connect} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { launchImageLibrary } from 'react-native-image-picker';


const styles = StyleSheet.create({
    inputIOS: {
        fontSize: responsiveScreenFontSize(1),
        height: '100%', 
        width: '100%',

    },
})

function BookCoverView({navigation,handleBookCover, bookCover}) {

    const {width, height} = useWindowDimensions();


    const getPhotos = async () => {
  
        const option = {
            mediaType: 'photo',
            selectionLimit: 1
        }

        launchImageLibrary(option, function(assets) {
            if(assets.assets) {
                handleBookCover(assets.assets[0]);
            }
        });
        
    };

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
                <View style={{  marginTop: '30%', width: '100%', height: '10%'}}>
                    
                    <Text style={{marginTop: 10, fontSize: responsiveScreenFontSize(1.4), fontWeight: '700',textAlign: 'center'}}>
                        도서 표지 이미지가 필요해요.        
                    </Text>
                    <Text style={{marginTop: 5, fontSize: responsiveScreenFontSize(1.1), fontWeight: '500', textAlign: 'center'}}>
                        (2/8)      
                    </Text>
                  

                </View>


                {!bookCover ?
                            <View style={{
                                marginTop: '30%',
                                width: responsiveScreenWidth(10),
                                height: responsiveScreenWidth(10), 
                                alignItems: 'center',
                                justifyContent: 'center', 
                    
                                borderWidth:1,
                            }}> 
                     
                            
                            <Pressable 
                               style={{
                                   justifyContent: 'center',
                                   alignItems: 'center',
                                   width: '100%',
                                   height: '100%',
                         
                               }}
                               onPress={() => getPhotos()}>
                                   <MaterialCommunityIcons name="camera" color='gray' size={27}/>
                           </Pressable>
                           </View>
                           :
                            <View style={{
                                marginTop: '20%',
                                width: responsiveScreenWidth(20),
                                height: responsiveScreenWidth(20), 
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth:1,
                                borderColor: 'gray',
                                borderRadius: 15
                            }}> 
                                <Image 
                                    source={{
                                        uri: bookCover.uri
                                    }}
                                    resizeMode='cover'
                                    style={{
                                        width: '90%',
                                        height: '90%'
                                        
,                                   }}
                                />
                                <Pressable 
                                    style={{
                                    
                                        width:27,
                                        height: 27,
                                        top: 0,
                                        right: 1,
                                        position: 'absolute'
                                    }}
                                    onPress={() =>{
                                            handleBookCover("")
                                    } }>
                                        <MaterialCommunityIcons 
                                                
                                                name="close-box" 
                                                size={30}
                                                color= 'black'/>
                                </Pressable>
                            </View>

                        }

            
                <Pressable 
                            disabled= {!bookCover ? true : false}
                            style={({pressed})=>[
                            {
                               backgroundColor: 
                               !bookCover ? 'gray' : 'blue'
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
                            onPress={()=> navigation.push('ISBN')}>
                        
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
    handleBookCover: (value) => (dispatch(registerBook("bookCover", value)))
});

const mapStateToProps = (state) => ({
    bookCover: state.registerBooks.bookRegisterObj.bookCover
});

export default connect(mapStateToProps, mapDispatchToProps)(BookCoverView);