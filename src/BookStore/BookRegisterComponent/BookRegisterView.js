import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Button, Pressable} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

 function BookRegisterView ({navigation}) {

    const [pdfFile, setPdfFile] = useState(null);

    const filePicker =  async () => {
        try {
            const file = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            
            });
        
            console.log(JSON.stringify(file))
            file.map((f)=> {
                setPdfFile(f);
                console.log(f.name)
            })
        
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                // The user canceled the document picker.
            } else {
                throw error;
            }
        }
    }

    return (
        <View style={{
            width: '100%',
            height: '100%',
            alignItems: 'center'
        }}>
                <ScrollView style={{
                    borderWidth: 1,
                    marginTop: 25,
                    width: '80%',
                    borderRadius: 15,
                    backgroundColor: 'white'
                }}>
                
                <View style={{
                    width: '100%',
                    height: responsiveScreenHeight(6),
                    alignItems: 'center',
                    marginTop: 30
                }}>

                    <View style={{
                        width: '50%',
                        height: '100%',
                        backgroundColor: '#E8E8E8',
                        borderRadius: 15,
                        //borderWidth: 1
                    }}>
                        {pdfFile === null ? 
                        <View style={{height: '100%', justifyContent: 'center', paddingLeft: 15}}>
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
                        </View> :
                            <View style={{height: '100%', justifyContent: 'center', paddingLeft: 15}}>

                                <Text>{pdfFile.name}</Text>

                                <Pressable 
                                    style={{
                                        position: 'absolute',
                                        right: 5,
                                        justifyContent: 'center',
                                        height: '100%'
                                    }}
                                    onPress={() => setPdfFile(null)}>
                                        <MaterialCommunityIcons name="minus-circle" size={27} color= '#F36B6B'/>
                                </Pressable>
                            </View>
                        }
                
                    </View>

                 </View>

            </ScrollView>
        </View>


    );



}

export default BookRegisterView;