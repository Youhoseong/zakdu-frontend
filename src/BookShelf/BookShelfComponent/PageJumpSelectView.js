import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';


const styles = StyleSheet.create({
    PageJumpSelectViewStyle : {
        width: '60%',
        height: '60%',
        backgroundColor: 'white',
        borderRadius: 15


    }


});



function PageJumpSelectView({pdfRef}) {


    return (
        <View style={styles.PageJumpSelectViewStyle}>
            <FlatList >
                <View>
                    <Text>
                        dd
                    </Text>
                </View>

            </FlatList>
        </View>
    );

}


export default PageJumpSelectView;