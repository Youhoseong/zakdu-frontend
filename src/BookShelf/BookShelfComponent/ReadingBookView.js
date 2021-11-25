import React, {useRef, useState, useEffect} from 'react';
import { View, useWindowDimensions, StyleSheet, Pressable, TextInput, Button, Image} from 'react-native';
import Pdf from 'react-native-pdf';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from  'react-native-modal';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import PageJumpSelectView from './PageJumpSelectView'
import * as RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decryptPages, decryptEpub} from '../decrypt/decrypter';
import {HS_API_END_POINT} from '../../Shared/env';
import axios from 'axios';
import {downloadPdfBook} from '../../Store/Download/BookDownload'
import { arrayAsString } from 'pdf-lib';
import CryptoJS from 'crypto-js';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',  
    },
    pdf: {
        flex:1,
        width: '100%',
        height: '100%'
    },
    HeaderBackIconStyle: {
        marginHorizontal: 12
    }
});

async function downloadPDF() {
    const src = await require("../../Assets/files/example_enc.pdf");
    var fromPath = Image.resolveAssetSource(src);
    const downloadPath = RNFS.DocumentDirectoryPath + "/downloaded.pdf";

    var source;
    console.log(downloadPath);
    await RNFS.downloadFile({
        fromUrl: fromPath.uri,
        toFile: downloadPath
    }).promise.then(res => {
        source = res;
        console.log("download!");
        console.log(res);
    });
}

async function pdf_test() {
    await downloadPDF();
    await lockPdfDownload();
    const test_data = [
        {pageNum: 1, aesKey: "abcdefghijklmnopqrstuvwxyzabcdef", iv: "0123456789abcdef"},
        {pageNum: 10, aesKey: "abcdefghijklmnopqrstuvwxyzabcdef", iv: "0123456789abcdef"},
        {pageNum: 15, aesKey: "abcdefghijklmnopqrstuvwxyzabcdef", iv: "0123456789abcdef"},
        {pageNum: 17, aesKey: "abcdefghijklmnopqrstuvwxyzabcdef", iv: "0123456789abcdef"}

    ];

    console.log(RNFS.DocumentDirectoryPath);
    RNFS.readDir(RNFS.DocumentDirectoryPath).then(files => {
        console.log(files);
    })
    const filePath = RNFS.DocumentDirectoryPath + "/" + "downloaded.pdf";
    decryptPages(filePath, test_data);
}

async function lockPdfDownload() {
    const lockPdfPath = RNFS.DocumentDirectoryPath + "/" + "lockpage.pdf";
    const lockPdfDownloadPath = "http://localhost:8081/src/Assets/files/lockpage.pdf"
    await RNFS.exists(lockPdfPath).then(exist => {
        if(!exist) {
            RNFS.downloadFile({
                fromUrl: lockPdfDownloadPath,
                toFile: lockPdfPath
            })
        }
    })
}

async function epub_test() {
    const downloadPath = RNFS.DocumentDirectoryPath + "/real.epub";

    RNFS.downloadFile({
        fromUrl: "http://localhost:8081/src/Assets/files/abc_enc.epub",
        toFile: downloadPath
    }).promise.then(res => {
        console.log("download epub");
        console.log(res);
    });

    const epubTestData = [
        {
            filePath: "OEBPS/Cath_9780553418828_epub3_itr_r1.xhtml",
            aesKey: "abcdefghijklmnopqrstuvwxyzabcdef",
            iv: "0123456789abcdef"
        }
    ]
    decryptEpub(downloadPath, epubTestData);
}

function ReadingBookView({route, navigation}) {
    const {height, width} = useWindowDimensions();
    const [pageModalVisible, setPageModalVisible] = useState(false);
    const pdfRef = useRef(null);

    const [source, setSource] = useState({ uri: "" });
    const [fileExist, setFileExist] = useState(false);
    //const source = {uri: RNFS.TemporaryDirectoryPath + "pdf/" + "downloaded.pdf_dec" };
    // epub_test();
    //pdf_test();

    useEffect(() => {
        // 보관함에 책 눌렀을 때 책 정보에서 받아와야 함
        const {book_id} = route.params
        const storageKey = "pdf_" + book_id;
        console.log(storageKey)

        AsyncStorage.getItem(storageKey).then(async (item) => {
            console.log(storageKey, item)
            if(item != null) {
                var itemData = JSON.parse(item);
                console.log(itemData);
                console.log(RNFS.DocumentDirectoryPath + "/pdf/" + itemData.fileName);
                decryptPages(RNFS.DocumentDirectoryPath + "/pdf/" + itemData.fileName, itemData.keys, itemData.realStartPage)
                    .then(() => {
                        console.log(RNFS.TemporaryDirectoryPath + "pdf/" + itemData.fileName + "_dec");
                        setSource({uri: RNFS.TemporaryDirectoryPath + "pdf/" + itemData.fileName + "_dec"});
                    });
            }
        }).catch(e => {
            // 파일이 없는 경우 처리 필요
            console.log("파일이 존재하지 않습니다.");
            console.log(e);
            navigation.goBack();
        });
    }, []);

    React.useLayoutEffect(() => {     
        navigation.setOptions({       
            headerLeft: ()=> {
                return(
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}> 
                        <Pressable style={styles.HeaderBackIconStyle} onPress={()=> {
                            navigation.goBack()
                        }}>
                            <MaterialCommunityIcons name="chevron-left" size={38} />
                        </Pressable>

                        <Pressable style={styles.HeaderBackIconStyle} onPress={()=> setPageModalVisible(true)}>
                            <MaterialCommunityIcons name="dock-window" size={27} />
                        </Pressable>

                        <View style={{
                            alignItems:'center',
                            marginHorizontal: 12,
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                            <TextInput
                                placeholder="이동할 페이지를 입력하세요."
                                style={{
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    height: '30%',
                                    width: '50%',
                                    marginRight: 10,
                                    padding: 5,
                                    
                                    shadowColor: "#000",
                                    shadowOffset: {
                                      width: 1,
                                      height: 2,
                                    },
                                    shadowOpacity: 0.4,
                                    shadowRadius: 1,
                                    
                                    
                                   
                                }}

                                onSubmitEditing={(e)=> {
                                    if(!isNaN(e.nativeEvent.text) && Number.isInteger(parseInt(e.nativeEvent.text))) {
                                        pdfRef.current.setPage(parseInt(e.nativeEvent.text));
                                    }else {
                                        console.log('숫자가아님')
                                    }
                                }}
                                keyboardType="numeric">
                                
                            </TextInput>  
                        </View>
                    </View>
                )
            },
            headerRight: ({})=> {
                return(
                    <View>
                        <Pressable style={styles.HeaderBackIconStyle}>
                            <MaterialCommunityIcons name="format-list-bulleted" size={27} />
                        </Pressable>
                    </View>
                )
            }
        });   
    }, [navigation]);

    return (
        <View style={{
            width: '100%',
            height: '100%'
        }}>
     
            <View style={styles.container}>
               
                <Pdf
                    ref={pdfRef}
                    source={source}
                    onLoadComplete={(numberOfPages,filePath, Dimension, TableOfContent)=>{
                        console.log("Number of Pages: "+numberOfPages);
                        console.log("Path: :"+filePath);
                        console.log("Width & Height: "+JSON.stringify(Dimension));
                        console.log("Table of Content is an Object: "+TableOfContent);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}
                    horizontal={width > height ? true : false}
                    enablePaging={true}/>

            </View>

            <Modal 
                isVisible={pageModalVisible}
                useNativeDriver={true}
                style={{ 
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onBackdropPress={()=> setPageModalVisible(false)}>
               
                <Pressable
                        onPress={() => setPageModalVisible(false)} style={{margin: 5}}>
                        <Icon name="times-circle" size={30} color="white" />
                </Pressable>

                <PageJumpSelectView pdfRef={pdfRef} pdfSource={source} setModalVisible={setPageModalVisible}/>
      
            </Modal>
        </View>
    );
}

export default ReadingBookView;