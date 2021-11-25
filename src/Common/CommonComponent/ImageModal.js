import React, { useState} from 'react';
import {
    Image, 
} from 'react-native';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


export const ImageModal = ({imageModalVisible, setImageModalVisible, base64Image}) => {
    return (
        <Modal 
        isVisible={imageModalVisible}
        useNativeDriver={true}
        style={{ 
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        hideModalContentWhileAnimating={true} 
        onSwipeComplete={()=> setImageModalVisible(false)}
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
            source={{
                uri: base64Image
            }}
            
        />
    
    </Modal>
    );
}