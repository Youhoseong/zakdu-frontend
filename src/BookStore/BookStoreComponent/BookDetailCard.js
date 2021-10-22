import React, {useState, useRef} from 'react';
import {View, Text, ScrollView , Image, Alert, StyleSheet} from 'react-native';
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
    width: ${responsiveScreenWidth(45)}px;
    height: ${responsiveScreenHeight(50)}px;
    display: flex;
    flex-direction: row;
   // border: solid;
    margin: ${responsiveScreenHeight(5)}px auto;
`;

const styles = StyleSheet.create({
    buyButton: {
        backgroundColor:'#33CD6E',
        borderRadius: 20,
        width: responsiveScreenWidth(11),
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginVertical: responsiveScreenHeight(1)
    },

    buyButtonText: {
        textAlign: 'center',
        fontSize: responsiveScreenFontSize(0.7),
        color: 'white'
    },

    buyButtonView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: responsiveScreenHeight(7),
    }

    
})

function BookDetailCard ({index, item}) {


    return (
        <BookDetailView>
            <Text> index: {index}</Text>
            <BookDetailTopHalf>
            
            <ImageModal
                swipeToDismiss={false}
                resizeMode='contain'
            
                style={{
                    width: responsiveScreenWidth(15),
                    height: responsiveScreenHeight(30),
                    marginRight: responsiveScreenWidth(4),
                }}
                source={item.image}
            />
        
     
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
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: responsiveScreenFontSize(0.65),
            
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
      
        </BookDetailView>
    )


}

export default BookDetailCard;
