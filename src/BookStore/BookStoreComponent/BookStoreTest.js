import React, { useState } from 'react';
import {View, Text, Button} from 'react-native';
import Modal from 'react-native-modal';
import DetailBook from './DetailBook';
function BookStoreTest() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Button
             onPress={()=> setModalVisible(true)}
             title="give me modal">
                
            </Button>
            <Modal 
                isVisible={modalVisible}
                useNativeDriver={true}
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            
                <Button 
                    onPress={()=> setModalVisible(false)}
                    title="X">
                
                </Button> 
                <DetailBook/>

      
            </Modal>
        
        </View>
  
    );


}
export default BookStoreTest;