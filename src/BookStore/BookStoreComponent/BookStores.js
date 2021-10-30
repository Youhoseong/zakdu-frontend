import React, { useState } from 'react';
import {View, Text, Button, useWindowDimensions} from 'react-native';
import Modal from 'react-native-modal';
import DetailBook from './DetailBook';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import PartPurchaseView from './PartPurchaseView';




function BookStores({navigation}) {
    const [detailBookVisible, setDetailBookVisible] = useState(false);
    const [partBookPurchaseVisible, setPartBookPurchaseVisible] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const gotoPartPurchaseView = (currentIndex) => {
       
        setSelectedBookId(currentIndex);
        setDetailBookVisible(false);
        setTimeout(function(){setPartBookPurchaseVisible(true)}, 600);

        //navigation.push('PartPurchase', {'selectedBook': currentIndex});
  
    }

  
    const {width, height} = useWindowDimensions();



    return (
        <View>
            <Button
             onPress={()=> setDetailBookVisible(true)}
             title="give me modal">
                
            </Button>
            <Modal 
                isVisible={detailBookVisible}
                useNativeDriver={true}
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                onBackdropPress={()=> setDetailBookVisible(false)}>
            


                <TouchableOpacity 
                        onPress={() => setDetailBookVisible(false)} >
                        <Icon name="times-circle" size={30} color="white" />
                </TouchableOpacity>

                <DetailBook gotoSecond={gotoPartPurchaseView}/>

      
            </Modal>


            <Modal 
                isVisible={partBookPurchaseVisible}
                useNativeDriver={true}
                style={{ 
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onBackdropPress={()=> setPartBookPurchaseVisible(false)}>
               
            


                <TouchableOpacity 
                        onPress={() => setPartBookPurchaseVisible(false)} style={{margin: 5}}>
                        <Icon name="times-circle" size={30} color="white" />
                </TouchableOpacity>

                <PartPurchaseView  selectedBook={selectedBookId}/>

      
            </Modal>
        
        </View>
  
    );


}
export default BookStores;