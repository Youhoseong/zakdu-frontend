
import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, useWindowDimensions }from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth} from 'react-native-responsive-dimensions'
import Animation from 'lottie-react-native';
import DocumentPicker from 'react-native-document-picker';
import HeaderBackButton from '../../Common/CommonComponent/HeaderBackButton';
import axios from 'axios';
import {HS_API_END_POINT} from '../../Shared/env';

function  BookRegisterFileUploadView ({navigation}) {
    const [bookRegisterObj, setBookRegisterObj] = useState({
        bookFile: null,
        bookName: null,
        bookPrice: null,
        bookCategory: null
    });
    const [fileValidate, setFileValidate] = useState("");
    const {width ,height} = useWindowDimensions();

    const onPressUploadFile = async() => {
        const formData = new FormData();

        formData.append('files', {
                name: bookRegisterObj.bookFile.name,
                type: bookRegisterObj.bookFile.type,
                uri: bookRegisterObj.bookFile.uri

        });
   
        axios.post(`${HS_API_END_POINT}/book/bookmark`, formData,{
                headers: {
                        'Content-Type': 'multipart/form-data'
                },
        }).then((res)=> {
            if(res.data) {
                console.log(res.data);
                if(res.data.statusEnum === "BOOKMARK_NO_EXIST") {
                    navigation.push('BookMarkChecking', 
                    {
                        'fileObj': bookRegisterObj,
                        'bookmarkResult': false,
                        'tocResult': null
                    })
                } else if(res.data.statusEnum === "OK") {
                    navigation.push('BookMarkChecking', 
                    {
                        'fileObj': bookRegisterObj,
                        'bookmarkResult': true,
                        'tocResult': res.data.data
                    })
                }
            }
        }).catch((err)=> {
            console.error(err);
        })
    


    }
        
    
    const filePicker =  async () => {
        try {
            const file = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            
            });
        
            console.log(JSON.stringify(file))
            file.map((f)=> {
                if(f.type === "application/epub+zip" || f.type === "application/pdf") {
                    setBookRegisterObj({
                        ...bookRegisterObj,
                        ["bookFile"]: f
                    });
                    setFileValidate("");
                }else {
                    setFileValidate("pdf 혹은 epub 확장자만 업로드 가능해요.");
                }
                
            })
        
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                // The user canceled the document picker.
            } else {
                throw error;
            }
        }
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
        <View style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            backgroundColor: 'white'
        }}>
              <View style={{
                    width: width > height ? '30%' : '50%',
                    height: width > height ? '100%' : '80%',
                    alignItems: 'center',
                    //borderWidth: 1,
                }}>
                    
                    <View style={{  
                        marginTop: 100,       
                        width: '100%',
                        height: '10%',
                    }}>
                        
                        <Text 
                            style={{
                                fontSize: responsiveScreenFontSize(1.5),
                                fontWeight: '500',
                             
                            }}>
                            도서 분할은 작두가 해드릴게요.      
                        </Text>
                   
                        <Text 
                            style={{
                                marginTop: 10,
                                fontSize: responsiveScreenFontSize(1.3),
                                fontWeight: '500',
                            
                            }}>
                            파일을 업로드 해주세요.            
                        </Text>
                    
                    </View>

                    <Animation
                                style={{
                                    width: 300, 
                                    height: 300,                     
                                }}
                                source={require('../../Assets/json/38287-scanning-searching-for-data.json')} 
                                autoPlay
                                resizeMode= 'cover'/>
                    
                        {bookRegisterObj.bookFile === null ?
                            <View style={{
                                width: '100%',
                                height: '10%', 
                        
                                justifyContent: 'center', 
                                paddingLeft: 15,
                                borderWidth:1,
                                borderColor: fileValidate === "" ? 'black' : 'red'
                            }}> 
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
                           </View>
                           :
                           <View style={{
                            width: '100%',
                            height: '10%', 
                            justifyContent: 'center', 
                            paddingLeft: 15,
                            borderWidth:1,
                            borderColor: fileValidate  === "" ? 'black' : 'red'
                        }}> 
                            <Text>
                                {bookRegisterObj.bookFile.name}
                            </Text> 
                            <Pressable 
                                   style={{
                                       position: 'absolute',
                                       right: 5,
                                       justifyContent: 'center',
                                       height: '100%'
                                   }}
                                   onPress={() =>{
                                        setBookRegisterObj({
                                            ...bookRegisterObj,
                                            ["bookFile"]: null
                                        })
                                   } }>
                                       <MaterialCommunityIcons name="minus-circle" size={27} color= '#F36B6B'/>
                            </Pressable>
                            </View>

                        }
                        <Text style={{
                            color: 'red',
                            marginTop: 5
                        }}>{fileValidate} </Text>

                    
                    <Pressable 
                        disabled={bookRegisterObj.bookFile === null ? true : false} 
                        style={({pressed})=>[
                        {
                            backgroundColor: 
                            bookRegisterObj.bookFile === null ? 'gray'  : pressed ? '#2A3AC4' : '#3448F3',
                        }, 
                        {
                            width: '100%',
                            height: width > height ? responsiveScreenHeight(6) : responsiveScreenWidth(6),
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 100,
                            borderRadius: 30,
                          
                        }
                    ]}
                        onPress={async()=> {
                            await onPressUploadFile();
                         
                        }}>
                    
                        <Text 
                            style={{
                                color: 'white',
                                fontSize: responsiveScreenFontSize(1.0)
                            }}>
                            업로드

                        </Text>
                    </Pressable>
                </View>
        

        </View>

    );



}

export default BookRegisterFileUploadView;