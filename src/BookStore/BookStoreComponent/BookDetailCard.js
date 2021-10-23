import React, {useState, useRef} from 'react';
import {View, Text, ScrollView, RefreshControl ,Image, Alert, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageModal from 'react-native-image-modal';


const BookDetailView = styled.ScrollView`
    width: ${responsiveScreenWidth(60)}px;
    height: ${responsiveScreenHeight(100)}px;
    background-color: #ffffff;
    border-radius: 15px;
    border: solid #CBCACA;
    margin: ${responsiveScreenHeight(3)}px auto;
`;

const BookDetailTopHalf = styled.View`
    width: ${responsiveScreenWidth(50)}px;
    height: ${responsiveScreenHeight(35)}px;
    display: flex;
    flex-direction: row;
    //border: solid;
    margin: ${responsiveScreenHeight(4)}px auto 0 auto;
`;

const BookDetailBottomHalf = styled.View`
    width: ${responsiveScreenWidth(50)}px;
    height: ${responsiveScreenHeight(50)}px;
   // display: flex;
   // flex-direction: row;
  //  border: solid;
    margin: ${responsiveScreenHeight(0)}px auto;
`;


const styles = StyleSheet.create({
    buyButton: {
        backgroundColor:'#33CD6E',
        borderRadius: 20,
        width: responsiveScreenWidth(14),
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
        bottom: 0,
      

    },
    imageModalStyle: {
        width: responsiveScreenWidth(15),
        height: '100%',
        marginRight: responsiveScreenWidth(4),
        shadowColor: '#C2C2C2',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.7,
        shadowRadius: 3, 

    }

    
})

function BookDetailCard ({index, item}) {


    return (
        <BookDetailView>

            <BookDetailTopHalf>

                <View style={{
                        width: '40%',
                        height: responsiveScreenHeight(30),
                }}>
                    <ImageModal
                        resizeMode='contain'
                    
                        style={styles.imageModalStyle}
                        source={item.image}
                    />
                </View>
        
     
                <View style={{
                    width: '60%',
                    height: responsiveScreenHeight(30),
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
                                marginVertical: 15
                            }} />
                        <Text numberOfLines={10} 
                            style={{
                                textAlign: 'center',
                                fontSize: responsiveScreenFontSize(0.65),

                                lineHeight: 18
                
                            }}>
                            {item.content}
                        </Text>

                        <View style={styles.buyButtonView}>
                            <TouchableOpacity 
                                style={styles.buyButton} 
                                onPress={() => Alert.alert('Button with adjusted color pressed')}>
                                <Text style={styles.buyButtonText}>부분 구매하기</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={styles.buyButton} 
                                onPress={() => Alert.alert('Button with adjusted color pressed')}>
                                <Text style={styles.buyButtonText}>구매하기 </Text>
                            </TouchableOpacity>
                        </View>
            

                </View>
            </BookDetailTopHalf>
            <BookDetailBottomHalf>
                <Text style={{
                    lineHeight: 18
                }}
                >{item.detailContent}</Text>

                
            </BookDetailBottomHalf>
      
        </BookDetailView>
    )


}

export default BookDetailCard;
