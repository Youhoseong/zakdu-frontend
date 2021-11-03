import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

 function BookRegisterView ({navigation}) {

    const [temp, setTemp] = useState();



    return (
        <View style={{
            width: '100%',
            height: '100%'
        }}><Button
            onPress={async () => {
                try {
                    const file = await DocumentPicker.pick({
                        type: [DocumentPicker.types.pdf],
                        copyTo: 'documentDirectory',
                    });
                    setTemp({
                        document: decodeURI(
                            file.fileCopyUri.replace('file://', ''),
                        ),
                    });
                } catch (error) {
                    if (DocumentPicker.isCancel(error)) {
                        // The user canceled the document picker.
                    } else {
                        throw error;
                    }
                }
        }}
        title="Open a PDF Document..."
    />
         

 
        </View>


    );



}

export default BookRegisterView;