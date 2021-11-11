import PDFRowCountGetView from "./PDFRowCountGetView";
import React, {useState} from 'react';
import {View, Text, Pressable, useWindowDimensions, TextInput, StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    innerViewStyle: {
        width: '90%',
        height: '5%',
        backgroundColor: '#DADADA',
        borderRadius: 30,
        marginVertical: 8
        
    }
})

function PDF1RowComponent() {
    return(
        <View
        style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <View style={[
                styles.innerViewStyle,  
            ]}/>
            <View style={[
                styles.innerViewStyle,
                {
                    backgroundColor: 'gray',
                }
            ]}/>
            <View style={[
                styles.innerViewStyle,  
            ]}/>
            <View style={[
                styles.innerViewStyle,
                {
                    backgroundColor: 'gray'
                }
            ]}/>
            <View style={[
                styles.innerViewStyle,  
            ]}/>
             <View style={[
                styles.innerViewStyle,
                {
                    backgroundColor: 'gray'
                }
            ]}/>
        </View>
    );


}
export default PDF1RowComponent;