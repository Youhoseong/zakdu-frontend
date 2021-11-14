import React from 'react';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    innerViewStyle: {
        width: '80%',
        height: '5%',
        backgroundColor: '#DADADA',
        borderRadius: 30,
        marginVertical: 10
    }
})

function PDF3RowComponent() {
    return(
        <View
            style={{
                width: '100%',
                height: '100%',
                borderColor: '#CECECE',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'row'
            }}>
            <View 
                style={{
                    width:'30%', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRightWidth: 1,
                    borderRightColor: '#CECECE'
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
                    width:'30%', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRightWidth: 1,
                    borderRightColor: '#CECECE'
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
                    width:'30%', 
                    justifyContent: 'center',
                    alignItems: 'center',
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
export default PDF3RowComponent;