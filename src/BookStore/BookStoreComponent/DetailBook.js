import React, {useState, useRef} from 'react';
import {View, Text, Alert, StyleSheet, useWindowDimensions, Image, Pressable} from 'react-native';
import styled from 'styled-components/native';
import {
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import Carousel from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import {HS_API_END_POINT} from '../../Shared/env';
import * as RNFS from 'react-native-fs';



const BookDetailView = styled.ScrollView`
    width: 90%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 15px;
    border: solid #CBCACA;
    margin: auto;
`;

const BookDetailTopHalf = styled.View`
    width: 85%;
    height: ${(props)=> props.width > props.height ? responsiveScreenHeight(40) : responsiveScreenWidth(40)}px;
    display: flex;
    flex-direction: row;
    //border: solid;
    margin: 6% auto 0 auto;
`;

const BookDetailBottomHalf = styled.View`
    width: 85%;
    height: 50%;
    margin: 6% auto;
   // border: solid;
`;


const styles = StyleSheet.create({
    buyButton: {
        backgroundColor: 'black',
        borderRadius: 20,
        width: '100%',
        paddingVertical: 13,
        paddingHorizontal: 13,      
    },

    buyButtonText: {
        textAlign: 'center',
        fontSize: responsiveScreenFontSize(0.7),
        color: 'white'
    },

    buyButtonView: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 17,
    },  
})

const IMAGES = {
    image1: require('../../Assets/images/img.png'),
    image2: require('../../Assets/images/images.jpeg')
};

const downloadBook = async (id) => {
    // 책 id 전송해야함!
    axios.get(HS_API_END_POINT + "/download/pdf_test", {params: {id: 1}}).then(async (res) => {
        const pdfDirPath = RNFS.DocumentDirectoryPath + "/pdf/";
        const data = res.data.data;
        console.log(data);
        if (!await RNFS.exists(pdfDirPath)) {
           await RNFS.mkdir(pdfDirPath);
        }
        RNFS.writeFile(pdfDirPath + data.fileName, data.bytes, 'base64');
    })
}


function DetailBook ({bookId, gotoSecond}) {

    const carouselRef = useRef();
    const {width, height} = useWindowDimensions();
        const BookDetailCard = ({index, item}) => {
            return (
                <View style={{
                    width: '100%',
                    height: '100%',
                   // borderWidth: 1
                }}>
                <BookDetailView>
                    <BookDetailTopHalf width={width} height={height}>
                        <View style={{
                                width: '40%',
                                height: '100%',
                                //borderWidth: 1,
                        }}>
                            <Pressable style={{
                                height: '83%',
                                marginTop: '17%'
                            }}>
                                <Image
                                    resizeMode='cover'
                                    style={{
                                        height: '100%',
                                        width: width > height ? responsiveScreenWidth(16) : responsiveScreenHeight(16),
                                        alignContent: 'center',
                                        borderWidth:1,
                                        borderColor: '#C2C2C2',
                                    }}
                                    source={item.image}
                                />
                            </Pressable>
                        </View>
                
            
                        <View style={{
                            width: '60%',
                            height: '100%',
                            //borderWidth: 1
                        }}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: responsiveScreenFontSize(1.2),
                                    }}>
                                    {item.title}
                                </Text>
                                <View
                                    style={{
                                        borderBottomColor: '#CBCACA',
                                        borderBottomWidth: 1,
                                        marginVertical: '5%'
                                    }} />
                                <Text numberOfLines={10} 
                                    style={{
                                        textAlign: 'center',
                                        fontSize: responsiveScreenFontSize(0.7),
                                        lineHeight: 18
                                    }}>
                                    {item.content}
                                </Text>

                                <View style={styles.buyButtonView}>
                                    <View style={{
                                        width: '45%'
                                    }}>
                                    <TouchableOpacity 
                                        style={styles.buyButton} 
                                        onPress={() => {gotoSecond(books[carouselRef.current.currentIndex])}}>
                                        <Text style={styles.buyButtonText}>부분 구매하기</Text>
                                    </TouchableOpacity>
                                    </View>
                                    <View style={{
                                        width: '45%'
                                    }}>
                                    <TouchableOpacity 
                                        style={styles.buyButton} 
                                        // onPress={() => Alert.alert('구매하기')}>
                                        onPress={downloadBook}>
                                        <Text style={styles.buyButtonText}>구매하기 </Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                    

                        </View>
                    </BookDetailTopHalf>
                    <BookDetailBottomHalf>
                        <Text style={{
                            lineHeight: 20,
                            textAlign: 'center',
                            fontSize: responsiveScreenFontSize(0.7),
                        }}
                        >{item.detailContent}</Text>

                        
                    </BookDetailBottomHalf>
            
                </BookDetailView>
                </View>
            )


        }



    const [books, setBooks] = useState([
        { 
            id: 0, 
            image: IMAGES.image1,
            title: '쎈 중등수학 2(하)',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            detailContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            id: 1,
            image: IMAGES.image1,
            title: '쎈 중등수학 2(하)',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            detailContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },

        {
            id: 2,
            image: IMAGES.image2,
            title: '쎈 중등수학 2(하)',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            detailContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            id: 3,
            image: IMAGES.image2,
            title: '쎈 중등수학 2(하)',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            detailContent: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et d Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et d Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et d consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
    
    ]);
    

    return (
        <View>
            <Carousel
                firstItem={Number(bookId)}
                scrollEnabled={true}
                layout='default'
                inactiveSlideScale={1}
                data={books}
                sliderWidth={width}
                itemWidth={width > height ? width*0.63 : width* 0.80}
                renderItem={BookDetailCard}
                ref={carouselRef}
            />
          
        </View>
    );
}

export default DetailBook;