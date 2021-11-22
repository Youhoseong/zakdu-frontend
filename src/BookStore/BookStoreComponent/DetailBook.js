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
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNFS from 'react-native-fs';


import { connect } from 'react-redux';
import { getBook } from '../../Store/Actions';

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


    bookInfoCardView: {      
        borderColor: 'gray',
        borderRadius: 20, 
        width: '100%',
        height: '30%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },

    bookInfoItem:{
        paddingHorizontal: 5,
        height: '100%',
        width: '20%',
        justifyContent: 'center'
    },
    bookInfoItemTitle:{
        textAlign: 'center',
        fontSize: responsiveScreenFontSize(0.6),
        fontWeight: '600',
        color: '#A6A6A6',
    },
    bookInfoContent: {
  
        fontSize: responsiveScreenFontSize(0.8),
        fontWeight: '600',
        marginTop: '5%',
        textAlign: 'center'
    }


    
})



const downloadBook = async (id) => {
    // 책 id 전송해야함!
    // key는 "pdf_" + id
    axios.get(HS_API_END_POINT + "/download/pdf", {params: {id: 1}}).then(async (res) => {
        const pdfDirPath = RNFS.DocumentDirectoryPath + "/pdf/";
        console.log(pdfDirPath);
        const data = res.data.data;
        console.log(data);
        if (!await RNFS.exists(pdfDirPath)) {
           await RNFS.mkdir(pdfDirPath);
        }
        RNFS.writeFile(pdfDirPath + data.fileName, data.bytes, 'base64');
        const localData = {
            book_id: id,
            fileName: data.fileName,
            title: data.title,
        }
        await AsyncStorage.setItem("pdf_" + id, JSON.stringify(localData));
        const tt = await AsyncStorage.getItem("pdf_" + id);
        console.log(JSON.parse(tt));
    })
}


function DetailBook ({gotoSecond, selectedBookObj, selectedBookId}) {

    const carouselRef = useRef();
    const {width, height} = useWindowDimensions();


        const BookInfoCard = ({item}) => {
            const date = new Date(item.pubDate)
            return (
                <View style={styles.bookInfoCardView}>
                    <View style={styles.bookInfoItem}>
                        <Text style={styles.bookInfoItemTitle}>장르</Text>
                        <Text style={styles.bookInfoContent}>{item.category}</Text>
                    </View>
                    <View style={{borderLeftWidth: 1, borderLeftColor: '#C7C7C7', height: '70%'}}/>
                        
                    
                    <View style={styles.bookInfoItem}>

                        <Text style={styles.bookInfoItemTitle}>출시일</Text>
                        <Text style={styles.bookInfoContent}>{date.getFullYear()}년</Text>
                        <Text style={{
                            fontSize: responsiveScreenFontSize(0.6),
                            fontWeight: '600',
                            marginTop: '5%',
                            textAlign: 'center'
                        }}>{date.getMonth()+1}월 {date.getDate()}일</Text>
                    </View>
                    <View style={{borderLeftWidth: 1, borderLeftColor: '#C7C7C7', height: '70%'}}/>
                    <View style={styles.bookInfoItem}>

                        <Text style={styles.bookInfoItemTitle}>출판사</Text>
                        <Text numberOfLines={2}
                        style={styles.bookInfoContent}>{item.publisher}</Text>
                    </View>
                    <View style={{borderLeftWidth: 1, borderLeftColor: '#C7C7C7', height: '70%'}}/>
                    <View style={styles.bookInfoItem}>

                        <Text style={styles.bookInfoItemTitle}>가격</Text>
                        <Text 
                            numberOfLines={2}
                            style={styles.bookInfoContent}>{item.price.toLocaleString("ko-KR", { style: 'currency', currency: 'KRW' })}</Text>
                    </View>
                    <View style={{borderLeftWidth: 1, borderLeftColor: '#C7C7C7', height: '70%'}}/>
                    <View style={styles.bookInfoItem}>

                        <Text style={styles.bookInfoItemTitle}>총 페이지 수</Text>
                        <Text 
                            numberOfLines={2}
                        style={styles.bookInfoContent}>{item.pdfPageCount}</Text>
                    </View>
                </View>
            )
        }

        const BookDetailCard = ({index, item}) => {
            const base64Image = 'data:image/png;base64,' + item.bookCoverResource;

            return (
                <View style={{
                    width: '100%',
                    height: width > height ?'90%' : '70%',
                   // borderWidth: 1
                }}>
                <BookDetailView>
                    <BookDetailTopHalf width={width} height={height}>
                        <View style={{
                                width: '40%',
                                height: '100%',

                        }}>
                            <Pressable style={{
                                height: '83%',
                                marginTop: '17%',
                                shadowColor: 'gray',
                                shadowOffset: {
                                    width: 3,
                                    height: 2
                                },
                                shadowOpacity: 0.5,
                                shadowRadius: 20
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
                                    source={{
                                        uri: base64Image
                                    }}
                                />
                            </Pressable>
                        </View>
                
            
                        <View style={{
                            width: '60%',
                            height: '100%',
      
                        }}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: responsiveScreenFontSize(1.2),
                                    }}>
                                    {item.name}
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
                                    {item.intro}
                                </Text>

                                <View style={styles.buyButtonView}>
                                    <View style={{
                                        width: '45%'
                                    }}>
                                    <TouchableOpacity 
                                        style={styles.buyButton} 
                                        onPress={() => {gotoSecond(selectedBookObj[carouselRef.current.currentIndex])}}>
                                        <Text style={styles.buyButtonText}>부분 구매하기</Text>
                                    </TouchableOpacity>
                                    </View>
                                    <View style={{
                                        width: '45%'
                                    }}>
                                    <TouchableOpacity 
                                        style={styles.buyButton} 
                                        // onPress={() => Alert.alert('구매하기')}>
                                        onPress={() => downloadBook(1)}>
                                        <Text style={styles.buyButtonText}>구매하기 </Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                    

                        </View>
                    </BookDetailTopHalf>
                    <BookDetailBottomHalf>
                        <BookInfoCard item={item} />
                        <Text style={{
                            lineHeight: 20,
                            textAlign: 'center',
                            fontSize: responsiveScreenFontSize(0.7),
                        }}
                        >{item.content}</Text>

                        
                    </BookDetailBottomHalf>
            
                </BookDetailView>
                </View>
            )


        }

    return (
        <View style={{
            height: '90%',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Carousel
                firstItem={Number(selectedBookId)}
                scrollEnabled={true}
                layout='default'
                inactiveSlideScale={1}
                data={selectedBookObj}
                sliderWidth={width}
                itemWidth={width > height ? width*0.63 : width* 0.80}
                renderItem={BookDetailCard}
                ref={carouselRef}
            
            />
          
        </View>
    );
}
const mapStateToProps = (state) => ({
    bookObj: state.getBooks.bookObj
});


export default connect(mapStateToProps)(DetailBook);