import React, {useState, useRef} from 'react';
import {View, Text, StatusBar, Image, Dimensions, Button, Alert, StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import styled from 'styled-components/native';
import {
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import BookDetailCard from './BookDetailCard';


const IMAGES = {
    image1: require('../../Assets/images/img.png'),
    image2: require('../../Assets/images/images.jpeg')
};

function DetailBook ({bookId}) {
    
    const { width } = Dimensions.get('window');

    const [books, setBooks] = useState([
        { 
            id: 0, 
            image: IMAGES.image1,
            title: '쎈 중등수학 2(하)',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            id: 1,
            image: IMAGES.image1,
            title: '쎈 중등수학 2(하)',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            id: 2,
            image: IMAGES.image2,
            title: '쎈 중등수학 2(하)',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            id: 3,
            image: IMAGES.image2,
            title: '쎈 중등수학 2(하)',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
    
    ]);
    


    return (
        <View>
            <Carousel
                firstItem={bookId}
                scrollEnabled={true}
                layout='default'
                inactiveSlideScale={1}
                data={books}
                sliderWidth={responsiveScreenWidth(100)}px
                itemWidth={responsiveScreenWidth(60)}px
                renderItem={BookDetailCard}
              
             
            />
          
        </View>


    );


}

export default DetailBook;