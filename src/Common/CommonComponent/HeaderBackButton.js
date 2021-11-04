import React from 'react';
import {View, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function HeaderBackButton({navigation}) {

    return(
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }}> 
            <Pressable  onPress={()=> {
                navigation.goBack()
            }}>
                <MaterialCommunityIcons name="chevron-left" size={38} />
            </Pressable>

      
        </View>
    )


}

export default HeaderBackButton;