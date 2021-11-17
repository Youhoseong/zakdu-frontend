
import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import { connect } from 'react-redux';

function BookRegisterFail() {
    return (
        <View>

            <Text>실패!</Text>
        </View>

    )



}


export default connect(null) (BookRegisterFail);