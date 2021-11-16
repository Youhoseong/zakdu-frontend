
import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import { connect } from 'react-redux';

function BookRegisterComplete({bookObject}) {
    return (
        <View>

            <Text>{bookObject.bookName}</Text>
        </View>

    )



}

const mapStateToProps = (state) => ({
    bookObject : state.registerBooks.bookRegisterObj
})

export default connect(mapStateToProps) (BookRegisterComplete);