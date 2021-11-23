import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, useWindowDimensions, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {responsiveFontSize, responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth} from 'react-native-responsive-dimensions';
import HeaderBackButton from '../../Common/CommonComponent/HeaderBackButton';
import axios from 'axios';
import {HS_API_END_POINT} from '../../Shared/env';
import { registerBook } from '../../Store/Actions';
import Pdf from 'react-native-pdf';
import { isDisplayHorizontal } from '../../Common/CommonFunction/isDisplayHorizontal';


const styles = StyleSheet.create({
    pageDiffStyle: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pageDiffComponentStyle: {
        height: '90%'
    },
    pdfView: {
        marginVertical: 20,
        height: '75%',
        width: '100%',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        borderColor: 'gray'
    },
    pdf: {
        backgroundColor: 'white',
        flex: 1,
    },
    noticeTextViewStyle: {
        marginTop: '2%',
        width: '100%',
        height: '10%',
    },
    buttonView: {
        width: '100%',
        height: '27%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonBackground: {
        shadowOffset: {
            width: 3,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        shadowColor: 'gray',
        height: '100%',
        width: '45%',
        marginHorizontal: 7,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    buttonText: {
        color:'black',
        fontWeight: '500',
        fontSize: responsiveFontSize(0.8)                            
    }
});

const PdfComponent = ({handleRealStart, bookRealFirstTocPage, bookFile , edit}) => {
    const pdfFileExample = require('../../Assets/files/example.pdf')
    console.log(bookFile);
    return (
        <Pdf
            fitPolicy={1}
            maxScale={1}
            style={[
                styles.pdf, 
                {
                    width: '100%'
                    //width: width > height? responsiveScreenWidth(24) : responsiveScreenHeight(24)
                }
            ]}
            ref={null}
            source={{
                uri: bookFile.uri
            }}
            horizontal={true}
            singlePage={!edit}
            enablePaging={true}
            onPageChanged={(page)=> {
                console.log(page);
                handleRealStart(page);
            }}
            />
    );
}

function BookPageDiffCheck({navigation, bookRealFirstTocPage, bookFile, handleRealStart }) {
    const {width, height} = useWindowDimensions();
    const [activateDiff, setActivateDiff] = useState(false);

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
        <View style={styles.pageDiffStyle}>

            <View style={[
                styles.pageDiffComponentStyle,
                {
                    width: width > height ? '30%' : '50%'
                }
            ]}>
            {!activateDiff ?
                <View style={styles.noticeTextViewStyle}>
                    
                   
                    <Text style={{
                        textAlign: 'center', 
                        fontSize: responsiveScreenFontSize(1.4),
                        fontWeight: '600',
                        //color: '#818181'
                    }}>
                        "실제 책"에서 1 페이지가 맞나요?
                    </Text>
                    <Text style={{
                        marginTop: 10,
                        textAlign: 'center', 
                        fontSize: responsiveScreenFontSize(1.1),
                        fontWeight: '400',
                        //color: '#818181'
                    }}>
                        PDF 상 페이지와 다를 수 있어요.
                    </Text>
                </View>
                :
                <View style={styles.noticeTextViewStyle}>
                    
                    <Text style={{
                        textAlign: 'left', 
                        fontSize: responsiveScreenFontSize(1.2),
                        fontWeight: '500'
                    }}>
                         스와이프를 통해
                        
                    </Text>
                    <Text style={{
                        marginTop: 10,
                        textAlign: 'left', 
                        fontSize: responsiveScreenFontSize(1.2),
                        fontWeight: '400',
                        //color: '#818181'
                    }}>
                       "실제 책"의 1 페이지를 선택해주세요.
                    </Text>
                    
                    
                </View>
            }
                <View style={styles.pdfView}>
                    <PdfComponent bookRealFirstTocPage={bookRealFirstTocPage} bookFile={bookFile} handleRealStart={handleRealStart} edit={activateDiff} />
                </View>
                
                <View>
                    {!activateDiff ? 
                        <View style={styles.buttonView}>
                            <Pressable 
                                style={({pressed})=>[
                                    styles.buttonBackground,
                                    {
                                        backgroundColor: pressed ? '#E8E8E8': '#F7F7F7',
                                    }
                                ]}
                                onPress={()=> setActivateDiff(true)}
                                >
                                <Text style={styles.buttonText}>
                                    아니에요.
                                </Text>
                            </Pressable>

                            <Pressable style={({pressed})=>[
                                styles.buttonBackground,
                                {
                                    backgroundColor: pressed ? '#E8E8E8': '#F7F7F7',
                                }
                            ]}
                                onPress={()=> navigation.push('GetCategory')}
                            >
                                <Text style={styles.buttonText}>
                                    맞아요.
                                </Text>
                            </Pressable>

                        </View>
                        :
                            <View style={{
                                width: '100%',
                                height: '27%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                              
                                <Pressable 
                                style={({pressed})=>[
                                    styles.buttonBackground,
                                    {
                                        backgroundColor: pressed ? '#E8E8E8': '#F7F7F7',
                                    }
                                ]}
                                onPress={()=> {
                                    setActivateDiff(false);
                                }}
                                >
                                <Text style={styles.buttonText}>
                                    확인
                                </Text>
                            </Pressable>

                            </View>
                        
                        }
                    
                </View>
            </View>
            

 
        </View>
    );

}

const mapStateToProps = (state) => ({
    bookRealFirstTocPage: state.registerBooks.bookRegisterObj.bookRealFirstTocPage,
    bookFile: state.registerBooks.bookRegisterObj.bookFile
});

const mapDispatchToProps = (dispatch) => ({
    handleRealStart: (value) => dispatch(registerBook("bookPageDiff", value))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookPageDiffCheck);



