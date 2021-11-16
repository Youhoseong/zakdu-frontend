import React, {useState} from 'react';
import {View, Text, Pressable, useWindowDimensions, StyleSheet} from 'react-native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import HeaderBackButton from '../../../Common/CommonComponent/HeaderBackButton';
import PDF1RowComponent from './PDF1RowComponent';
import PDF2RowComponent from './PDF2RowComponent';
import PDF3RowComponent from './PDF3RowComponent';
import axios from 'axios';
import {HS_API_END_POINT} from '../../../Shared/env';
import {connect} from 'react-redux';
import { registerBook } from '../../../Store/Actions';


function PDFRowCountGetView({navigation, handleTocRow, handleTocResult ,bookInfo}) {
    const {width, height} = useWindowDimensions();
    const [submitDisabled, setSubmitDisabled] = useState(false);
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
        setSubmitDisabled(true);
        const formData = new FormData();
        let tocAnalyzeData = {
            bookPDFTocStartPage: bookInfo.bookPDFTocStartPage,
            bookPDFTocEndPage: bookInfo.bookPDFTocEndPage,
            bookPDFRowCount: bookInfo.bookPDFRowCount
        }

        let fileData = {
            name: bookInfo.bookFile.name,
            type: bookInfo.bookFile.type,
            uri: bookInfo.bookFile.uri
        }
        formData.append('bookTocAnalyzeDto', JSON.stringify(tocAnalyzeData));
        formData.append('files', fileData);
   
        axios.post(`${HS_API_END_POINT}/book/zakdu-analyze`, formData, {
                headers: {
                       // 'Content-Type': 'multipart/form-data'
                },
        }).then((res)=> {
            setSubmitDisabled(false);
            handleTocResult(res.data.data);
            navigation.push('ZakduLogicChecking');
        }).catch((err)=> {
            setSubmitDisabled(false);
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
                                borderColor: bookInfo.bookPDFRowCount === 1 ? 'red' :  '#CECECE'
                            }
                        ]}
                            onPress={()=> {
                                if(bookInfo.bookPDFRowCount == 1){
                                    handleTocRow("");
                                }else {
                                    handleTocRow(1);
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
                                borderColor: bookInfo.bookPDFRowCount === 2 ? 'red' :  '#CECECE'
                            }
                        ]}
                        onPress={()=> {
                            if(bookInfo.bookPDFRowCount == 2){
                                handleTocRow("");
                            }else {
                                handleTocRow(2);
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
                                borderColor: bookInfo.bookPDFRowCount === 3 ? 'red' :  '#CECECE'
                            }
                        ]} 
                        onPress={()=> {
                            if(bookInfo.bookPDFRowCount == 3){
                                handleTocRow("");
                            }else {
                                handleTocRow(3);
                            }
                        }}>
                        <PDF3RowComponent/>
                  
                    </Pressable>
                    <Text style={{textAlign:'center', marginTop: 5, fontSize: responsiveScreenFontSize(0.9)}}>3열</Text>
                </View>
            </View>
           


            <Pressable 
                        disabled={!bookInfo.bookPDFRowCount || submitDisabled ? true : false} 
                        style={({pressed})=>[
                        {
                            backgroundColor: 
                                !bookInfo.bookPDFRowCount || submitDisabled ? 'gray'  : pressed ? '#2A3AC4' : 'blue',
                        }, 
                        {
                            width: width > height ? '40%': '70%',
                            height: width > height ? responsiveScreenHeight(6) : responsiveScreenWidth(6),
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 100,
                            borderRadius: 30,
                            shadowOffset: {
                                width: 3,
                                height: 2
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 4,
                            shadowColor: 'gray',
                        
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

const mapDispatchToProps = (dispatch) => ({
    handleTocRow: (value) => (dispatch(registerBook("bookPDFRowCount", value))),
    handleTocResult: (value)=> (dispatch(registerBook("bookTocResult", value)))
});

const mapStateToProps = (state) => ({
    bookInfo: state.registerBooks.bookRegisterObj
});

export default connect(mapStateToProps, mapDispatchToProps)(PDFRowCountGetView);