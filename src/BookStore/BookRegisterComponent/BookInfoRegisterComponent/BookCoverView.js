import React, {useState} from 'react';
import {View, Text, Pressable, useWindowDimensions, TextInput, StyleSheet} from 'react-native';
import {responsiveScreenFontSize, responsiveScreenWidth, responsiveScreenHeight} from 'react-native-responsive-dimensions';
import Animation from 'lottie-react-native';
import HeaderBackButton from '../../../Common/CommonComponent/HeaderBackButton';
import RNPickerSelect from 'react-native-picker-select';
import { registerBook } from '../../../Store/Actions';
import {connect} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



const styles = StyleSheet.create({
    inputIOS: {
        fontSize: responsiveScreenFontSize(1),
        height: '100%', 
        width: '100%',

    },
})

function BookCoverView({navigation,handleBookCover, bookCover}) {

    const {width, height} = useWindowDimensions();
    const [fileValidate, setFileValidate] = useState("");

    const filePicker =  async () => {
        try {
            const file = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            
            });
        
            console.log(JSON.stringify(file))
            file.map((f)=> {
                if(f.type === "application/epub+zip" || f.type === "application/pdf") {
                    handleBookCover(f);
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

                <Animation
                        style={{width: 300,  height: 200}}
                        source={require('../../../Assets/json/81757-leaf.json')} 
                        autoPlay
                        resizeMode= 'cover'/>

             
              

                {!bookCover ?
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
                                {bookCover.name}
                            </Text> 
                            <Pressable 
                                   style={{
                                       position: 'absolute',
                                       right: 5,
                                       justifyContent: 'center',
                                       height: '100%'
                                   }}
                                   onPress={() =>{
                                        handleBookCover("")
                                   } }>
                                       <MaterialCommunityIcons name="minus-circle" size={27} color= '#F36B6B'/>
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
                            onPress={()=> navigation.push('GetName')}>
                        
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