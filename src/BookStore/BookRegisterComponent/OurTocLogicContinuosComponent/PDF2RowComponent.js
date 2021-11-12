import PDFRowCountGetView from "./PDFRowCountGetView";
import React, {useState} from 'react';
import {View, Text, Pressable, useWindowDimensions, TextInput, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    innerViewStyle: {
        width: '100%',
        height: '5%',
        backgroundColor: '#DADADA',
        borderRadius: 30,
        marginVertical: 10
    }
})

function PDF2RowComponent() {
    return(
        <View
            style={{
                width: '100%',
                height: '100%',
            

                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'row'
            }}>
            <View 
                style={{
                    width:'50%', 
             
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRightWidth: 1,
                    borderRightColor: '#CECECE',
                    padding: 8
                }}>
                <View style={[
                        styles.innerViewStyle,
                        {backgroundColor: 'gray',   }]}
                />
                <View style={styles.innerViewStyle}/>
                <View style={[
                        styles.innerViewStyle,
                        {backgroundColor: 'gray',   }]}
                />
                <View style={styles.innerViewStyle}/>
                <View style={[
                        styles.innerViewStyle,
                        {backgroundColor: 'gray',   }]}
                />
                <View style={styles.innerViewStyle}/>
            </View>
    

        
            <View   
            style={{
                    width:'50%', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8
                }}>
                <View style={[
                        styles.innerViewStyle,
                        {backgroundColor: 'gray',   }]}
                />
                <View style={styles.innerViewStyle}/>
                <View style={[
                        styles.innerViewStyle,
                        {backgroundColor: 'gray',   }]}
                />
                <View style={styles.innerViewStyle}/>
                <View style={[
                        styles.innerViewStyle,
                        {backgroundColor: 'gray',   }]}
                />
                <View style={styles.innerViewStyle}/>
            </View>
        </View>
    );


}
export default PDF2RowComponent;