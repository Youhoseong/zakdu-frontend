import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

function BookmarkTocCheckingView({navigation, route}) {
    const {fileObj} = route.params;
    const [bookRegisterObj, setBookRegisterObj] = useState(fileObj);
    return (
        <View>
            <Text>{bookRegisterObj.bookFile.name}</Text>

            <Button title="test" onPress={()=> 
            {
                const formData = new FormData();
                formData.append('files', {
                    name: bookRegisterObj.bookFile.name,
                    type: bookRegisterObj.bookFile.type,
                    uri: bookRegisterObj.bookFile.uri

                });

                fetch('http://localhost:8080/book', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData

                }).then(
                    (res)=> console.log(res)
                )
            }}>

            </Button>
        </View>
    );


}
export default BookmarkTocCheckingView;