import React, { useState } from 'react';
import {View, StyleSheet, Text, useWindowDimensions} from 'react-native';

const styles = StyleSheet.create({
    PageJumpSelectViewStyle : {
        width: '40%',
        height: '30%',
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'


    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
       
    },
    pdf: {
        flex:1,
        width: '50%',
        height: '50%',
        borderWidth:1
    },


});


function PageJumpSelectView({pdfRef, pdfSource, setModalVisible}) {
    const {height, width} = useWindowDimensions();
    const [temp, setTemp] = useState();


    return (
        <View style={styles.PageJumpSelectViewStyle}>
            <Text>dd{console.log('dd')}
                {temp}
            </Text>
          
        </View>
    );

}


export default PageJumpSelectView;