import React, {useState} from 'react';
import {View, Text, Pressable, useWindowDimensions, TextInput, StyleSheet} from 'react-native';
import Animation from 'lottie-react-native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import HeaderBackButton from '../../../Common/CommonComponent/HeaderBackButton';
import PDF1RowComponent from './PDF1RowComponent';
import PDF2RowComponent from './PDF2RowComponent';
import PDF3RowComponent from './PDF3RowComponent';
import axios from 'axios';
import {HS_API_END_POINT} from '../../../Shared/env';

function PDFRowCountGetView({navigation, route}) {
    const {fileObj} = route.params;

    const [bookRegisterObj, setBookRegisterObj] = useState(fileObj);
    const {width, height} = useWindowDimensions();
    
    const styles = StyleSheet.create({
        mainView: {
            width: '100%', 
            height: '100%', 
            alignItems: 'center', 
            backgroundColor: 'white'
        },
        secondView: (width,height)=> ({ 
            width: width > height ? '70%' : '50%',
            height: width > height ? '100%' : '80%',
            alignItems: 'center',
        }),
        rowSelectView: {
            width: '100%',
            height: '35%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        }
    })

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

    const onPress = async() => {
        const formData = new FormData();
        let tocAnalyzeData = {
            bookPDFTocStartPage: bookRegisterObj.bookPDFTocStartPage,
            bookPDFTocEndPage: bookRegisterObj.bookPDFTocEndPage,
            bookPDFRowCount: bookRegisterObj.bookPDFRowCount
        }

        let fileData = {
            name: bookRegisterObj.bookFile.name,
            type: bookRegisterObj.bookFile.type,
            uri: bookRegisterObj.bookFile.uri
        }
        formData.append('bookTocAnalyzeDto', JSON.stringify(tocAnalyzeData));
        formData.append('files', fileData);
   
        axios.post(`${HS_API_END_POINT}/book/zakdu-analyze`, formData, {
                headers: {
                       // 'Content-Type': 'multipart/form-data'
                },
        }).then((res)=> {
            navigation.push('ZakduLogicChecking', 
            {
                'fileObj': bookRegisterObj,
                'bookmarkResult': true,
                'tocResult': res.data.data
            })
        }).catch((err)=> {
            console.error(err);
        })
    


    }


    return (
        <View style={styles.mainView}>
        <View style={styles.secondView(width, height)}>
            <View style={{  marginTop: 100, width: '100%', height: '15%'}}>
                
                <Text style={{ fontSize: responsiveScreenFontSize(1.3), fontWeight: '700', textAlign: 'center'}}>
                    이제 거의 다 됐습니다.
                </Text>

                <Text style={{marginTop: 10, fontSize: responsiveScreenFontSize(1.0), fontWeight: '500',textAlign: 'center'}}>
                    목차 페이지의 열 수를 골라주세요.      
                </Text>
        

            </View>
            <View style={styles.rowSelectView}>

                <View style={{
                    width:  width >height ? '18%' : '30%',
                    height: '80%',
                    marginHorizontal: '3%'
                }}>
                    <Pressable style={({pressed})=>[
                            {
                                width: '100%',
                                height: '90%', 
                            }, 
                            {
                                borderRadius: 15,
                                borderWidth: 1,
                                borderColor: bookRegisterObj.bookPDFRowCount === 1 ? 'red' :  '#CECECE'
                            }
                        ]}
                            onPress={()=> {
                                if(bookRegisterObj.bookPDFRowCount == 1){
                                    setBookRegisterObj({
                                        ...bookRegisterObj,
                                        ["bookPDFRowCount"]: null
                                    });
                                }else {
                                    setBookRegisterObj({
                                        ...bookRegisterObj,
                                        ["bookPDFRowCount"]: 1
                                    });
                                }
                            }}
                        >
                        <PDF1RowComponent/>
                  
                    </Pressable>
                    <Text style={{textAlign:'center', marginTop: 5, fontSize: responsiveScreenFontSize(0.9)}}>1열</Text>
                </View>
                <View style={{
                    width:  width >height ? '18%' : '30%',
                    height: '80%',
                    marginHorizontal: '3%'
                }}>
                    <Pressable style={({pressed})=>[
                            {
                                width: '100%',
                                height: '90%', 
                            }, 
                            {
                                borderRadius: 15,
                                borderWidth: 1,
                                borderColor: bookRegisterObj.bookPDFRowCount === 2 ? 'red' :  '#CECECE'
                            }
                        ]}
                        onPress={()=> {
                            if(bookRegisterObj.bookPDFRowCount == 2){
                                setBookRegisterObj({
                                    ...bookRegisterObj,
                                    ["bookPDFRowCount"]: null
                                });
                            }else {
                                setBookRegisterObj({
                                    ...bookRegisterObj,
                                    ["bookPDFRowCount"]: 2
                                });
                            }
                        }}>
                        
                        <PDF2RowComponent/>
                  
                    </Pressable>
                    <Text style={{textAlign:'center', marginTop: 5, fontSize: responsiveScreenFontSize(0.9)}}>2열</Text>
                </View>
                
                <View style={{
                    width:  width >height ? '18%' : '30%',
                    height: '80%',
                    marginHorizontal: '3%'
                }}>
                    <Pressable style={({pressed})=>[
                            {
                                width: '100%',
                                height: '90%', 
                            }, 
                            {
                                borderRadius: 15,
                                borderWidth: 1,
                                borderColor: bookRegisterObj.bookPDFRowCount === 3 ? 'red' :  '#CECECE'
                            }
                        ]} 
                        onPress={()=> {
                            if(bookRegisterObj.bookPDFRowCount == 3){
                                setBookRegisterObj({
                                    ...bookRegisterObj,
                                    ["bookPDFRowCount"]: null
                                });
                            }else {
                                setBookRegisterObj({
                                    ...bookRegisterObj,
                                    ["bookPDFRowCount"]: 3
                                });
                            }
                        }}>
                        <PDF3RowComponent/>
                  
                    </Pressable>
                    <Text style={{textAlign:'center', marginTop: 5, fontSize: responsiveScreenFontSize(0.9)}}>3열</Text>
                </View>
            </View>
           


            <Pressable 
                        disabled={bookRegisterObj.bookPDFRowCount === null ? true : false} 
                        style={({pressed})=>[
                        {
                            backgroundColor: 
                                bookRegisterObj.bookPDFRowCount === null ? 'gray'  : pressed ? '#2A3AC4' : '#3448F3',
                        }, 
                        {
                            width: width > height ? '40%': '70%',
                            height: width > height ? responsiveScreenHeight(6) : responsiveScreenWidth(6),
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 100,
                            borderRadius: 30,
                        
                        }
                    ]}
                        onPress={()=> onPress()}>
                    
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

export default PDFRowCountGetView;