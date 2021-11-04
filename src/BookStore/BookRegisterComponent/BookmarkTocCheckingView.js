import React, {useState} from 'react';
import {View, Text} from 'react-native';

function BookmarkTocCheckingView({navigation, route}) {
    const {fileObj} = route.params;
    const [bookRegisterObj, setBookRegisterObj] = useState(fileObj);
    return (
        <View>
            <Text>{bookRegisterObj.bookFile.name}</Text>
        </View>
    );


}
export default BookmarkTocCheckingView;