import { NavigationAction } from '@react-navigation/routers';
import React, {useRef} from 'react';
import {Button, View, Text, useWindowDimensions, StyleSheet, Dimensions} from 'react-native';
import Pdf from 'react-native-pdf';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width: '100%',
        height: '100%'
    }
});

function HomeScreen({navigation}) {
    const {height, width} = useWindowDimensions();
    // 스크롤 방향 설정, 페이지 점프, 목차 제공
    const pdfRef = useRef(null);
    return (
        <View style={{
            width: '100%',
            height: '100%'
        }}>
            
            <View style={styles.container}>
                <View style={{
                    borderColor: 'gray',
                    borderWidth: 1
                }}>
                    <Button onPress={()=> pdfRef.current.setPage(3)}
                        title="Jump to page 3"
                    >

                    </Button>
                </View>
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



        </View>
    );
}

export default HomeScreen;