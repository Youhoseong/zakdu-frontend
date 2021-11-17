import React from 'react';
import {View, Text, useWindowDimensions, TextInput, Pressable} from 'react-native';
import HeaderBackButton from '../../../Common/CommonComponent/HeaderBackButton';
import {responsiveScreenFontSize, responsiveScreenWidth, responsiveScreenHeight} from 'react-native-responsive-dimensions';
import Animation from 'lottie-react-native';
import { registerBook } from '../../../Store/Actions';
import {connect} from 'react-redux';


function validInputs(start, end) {
    start = parseInt(start);
    end = parseInt(end);
    if(start == null  || end == null)
        return false;

    if(start <= end) {
        return true;
    }else {
        return false;
    }
}


function PDFTocPageGetView({navigation, handleTocPage, tocStart, tocEnd}) {
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
                <View style={{  marginTop: 50, width: '100%', height: '15%'}}>
                    
                    <Text style={{ fontSize: responsiveScreenFontSize(1.3), fontWeight: '700', textAlign: 'center'}}>
                        새로운 분석을 위해 정보가 필요해요.     
                    </Text>

                    <Text style={{marginTop: 10, fontSize: responsiveScreenFontSize(1.0), fontWeight: '500',textAlign: 'center'}}>
                        파일 내에 목차 페이지가 있는         
                    </Text>
                    <Text style={{marginTop: 5, fontSize: responsiveScreenFontSize(1.0), fontWeight: '500', textAlign: 'center'}}>
                        페이지 번호를 알려주세요. (PDF 파일 기준)         
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
                                width: '30%',
                                height: '100%',
                                borderBottomColor: 'gray',
                                borderBottomWidth: 3,
                                fontSize: responsiveScreenFontSize(1.0),
                                marginHorizontal: '5%'
                            }}
                            onChangeText={(text)=> {
                                
                                if(!isNaN(text) && Number.isInteger(parseInt(text))){
                                    handleTocPage("bookPDFTocStartPage", text)
                                }
                                if(!text){
                                    handleTocPage("bookPDFTocStartPage", "")
                                }
                            }}
                            value={tocStart}
                            keyboardType='number-pad'
                            placeholder="숫자만 입력해주세요."
                    />
                    <Text style={{textAlign: 'center', fontSize: responsiveScreenFontSize(1.2)}}>부터</Text>
                    <TextInput 
                            style={{
                                width: '30%',
                                height: '100%',
                                borderBottomColor: 'gray',
                                borderBottomWidth: 3,
                                fontSize: responsiveScreenFontSize(1.0),
                                marginHorizontal: '5%'
                            }}
                            onChangeText={(text)=> {
                                
                                if(!isNaN(text) && Number.isInteger(parseInt(text))){
                                    handleTocPage("bookPDFTocEndPage", text)
                                }
                                if(!text){
                                    handleTocPage("bookPDFTocEndPage", "")
                                }
                            }}
                            value={tocEnd}
                            keyboardType='number-pad'
                            placeholder="숫자만 입력해주세요."
                    />
                    <Text style={{textAlign: 'center', fontSize: responsiveScreenFontSize(1.2)}}>까지</Text>

                </View>

                <Pressable 
                            disabled={!validInputs(tocStart, tocEnd) ? true : false} 
                            style={({pressed})=>[
                            {
                                backgroundColor: 
                                !validInputs(tocStart, tocEnd) ? 'gray'  : pressed ? '#2A3AC4' : 'blue',
                            }, 
                            {
                                shadowOffset: {
                                    width: 3,
                                    height: 2
                                },
                                shadowOpacity: 0.5,
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
                            onPress={()=> navigation.push('GetRowCount')}>
                        
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

const mapStateToProps = (state) => ({
    tocStart: state.registerBooks.bookRegisterObj.bookPDFTocStartPage,
    tocEnd: state.registerBooks.bookRegisterObj.bookPDFTocEndPage,
})

const mapDispatchToProps = (dispatch) => ({
    handleTocPage: (key, value) =>  dispatch(registerBook(key, value))
})


export default connect(mapStateToProps, mapDispatchToProps)(PDFTocPageGetView);