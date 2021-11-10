import React from 'react';
import { useWindowDimensions, Pressable, Text, View } from "react-native"
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
const BasisButtonComponent = ({context,bColor, bFocusColor, setEditable, editable}) => {
    const {width, height} = useWindowDimensions();

    return (
        <Pressable 
                    onPress={()=> setEditable(!editable)}
                    style={({pressed})=>[
                         
                            {
                                backgroundColor: pressed ? bFocusColor : bColor,
                                width: '30%',
                                height: width > height ? responsiveScreenHeight(6) : responsiveScreenWidth(6),
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginHorizontal: width > height ? responsiveScreenWidth(1) : responsiveScreenHeight(1),
                                borderRadius: 30,
                            }
                        ]}>
                        
                        <Text style={{color: 'white',fontSize: responsiveScreenFontSize(1.0)}}>
                                {context}
                        </Text>
        </Pressable>
    )

}

export default BasisButtonComponent;