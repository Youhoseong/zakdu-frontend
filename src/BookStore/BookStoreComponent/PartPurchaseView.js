import React, {useState} from 'react';
import {View, Text, useWindowDimensions, StyleSheet, Image, ScrollView, Pressable} from 'react-native';
import styled from 'styled-components';
import ImageModal from 'react-native-image-modal';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const styles = StyleSheet.create({
    PartPurchaseViewStyle: {
        width: '90%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 15
    },

    PartPurchaseLeftView: {
        width: '40%',
        height: '100%',
        borderRightWidth: 1,
      //  borderWidth:1,
        alignItems: 'center',
        padding: 20
    },

    PartPurchaseRightView: {

    },

    BookTitleTextStyle: {
        fontSize: responsiveScreenFontSize(1.2),
        marginTop: '10%'
    }

})

function PartPurchaseView({navigation, selectedBook}) {
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const {width, height} = useWindowDimensions();
    //const {selectedBook} = route.params;
    return (
        <View style={styles.PartPurchaseViewStyle}>
                     
        
            <View style={styles.PartPurchaseLeftView}>
                <Text style={styles.BookTitleTextStyle}> {selectedBook.title}</Text>

                <Pressable onPress={()=> setImageModalVisible(true)} style={{marginTop: '10%'}}> 
                          
                    <Image
                        resizeMode='cover'
                        style={{
                        
                            width:  width > height ? responsiveScreenWidth(24): responsiveScreenHeight(20),
                            borderWidth: 1,
                            borderColor: '#C2C2C2'
                
                            
                        }}
                        source={selectedBook.image}
                    
                    ></Image>
                </Pressable>
                <Text> 미리보기 </Text>
          
                
               
            </View>

            <Modal 
                isVisible={imageModalVisible}
                useNativeDriver={true}
                style={{ 
              
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                   
                    
                    
                }}
               >

                <TouchableOpacity 
                        onPress={() => setImageModalVisible(false)}>
                        <Icon name="times-circle" size={30} color="white" />
                </TouchableOpacity>
                <Image
                    resizeMode='contain'
                    style={{
                        margin: 5,
                        height: '100%',
                        width: '100%',              
  
                    }}
                    source={selectedBook.image}
                    
                />
            
            </Modal>
        </View>
    );
}

export default PartPurchaseView;