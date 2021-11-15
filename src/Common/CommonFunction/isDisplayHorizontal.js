

import React, {useState} from 'react';
import { useWindowDimensions } from 'react-native';


export const isDisplayHorizontal = () => {
    const {width, height} = useWindowDimensions();

    if(width > height)
        return true;
    else
        return false;
}