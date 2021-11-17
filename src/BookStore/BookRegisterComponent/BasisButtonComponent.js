import React from 'react';
import { useWindowDimensions, Pressable, Text, View } from "react-native"
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import { tocCheckingStyles} from './BookmarkTocComponent/BookmarkTocCheckingView';

const BasisButtonComponent = ({context, setEditable, editable}) => {
    const {width, height} = useWindowDimensions();

    return (
        <Pressable 
                    onPress={()=> setEditable(!editable)}
                    style={({pressed})=>[
                            tocCheckingStyles.buttonStyle,
                            {   
                                backgroundColor: pressed ? '#E8E8E8': '#F7F7F7',
                                height: width > height ? responsiveScreenHeight(6) : responsiveScreenWidth(6),    
                                marginHorizontal: width > height ? responsiveScreenWidth(1) : responsiveScreenHeight(1),
                            }
                        ]}>
                        
                    <Text style={tocCheckingStyles.buttonTextStyle}>
                            {context}
                    </Text>
        </Pressable>
    )
}

export default BasisButtonComponent;