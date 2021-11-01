import { NavigationAction } from '@react-navigation/routers';
import React, {useRef, useLayoutEffect, useState} from 'react';
import {Button, View, Text, useWindowDimensions, StyleSheet, Dimensions, Pressable} from 'react-native';
import Pdf from 'react-native-pdf';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from  'react-native-modal';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import PageJumpSelectView from './PageJumpSelectView'
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


function HomeScreen({navigation}) {
    const {height, width} = useWindowDimensions();
    const [pageModalVisible, setPageModalVisible] = useState(false);
    const pdfRef = useRef(null);
    // 스크롤 방향 설정, 페이지 점프, 목차 제공


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
                    source={require('../../Assets/files/example.pdf')}
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
                    enablePaging={true}
                    
                    />

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

            
                <PageJumpSelectView pdfRef={pdfRef}/>
      
            </Modal>

                

      



        </View>
    );
}

export default HomeScreen;