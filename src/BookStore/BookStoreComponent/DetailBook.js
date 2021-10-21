import React, {useState, useRef} from 'react';
import {View, Text, StatusBar, Image, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import styled from 'styled-components/native';
import {
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveScreenFontSize
} from 'react-native-responsive-dimensions';


const IMAGES = {
    image1: require('../../Assets/images/img.png'),
    image2: require('../../Assets/images/images.jpeg')
};

const BookDetailView = styled.View`
    width: ${responsiveScreenWidth(60)}px;
    height: ${responsiveScreenHeight(70)}px;
    background-color: #ffffff;
    border-radius: 15px;
    border: solid;
    margin: ${responsiveScreenHeight(3)}px ${responsiveScreenWidth(2)}px;
    padding: ${responsiveScreenHeight(4)}px ${responsiveScreenWidth(6)}px;

`;

const BookDetailCard = ({index, item}) => {

    return (
        <BookDetailView>
         
            <Text> index: {index}</Text>

            <Image
            style={{height:'40%',width:'40%',resizeMode:'cover'}}
            source={item.image}/>

            <Text>
                {item.title}
            </Text>
      
        </BookDetailView>
    )
}


function DetailBook ({bookId}) {
    
    const { width } = Dimensions.get('window');

    const [books, setBooks] = useState([
        { 
            id: 0, 
            image: IMAGES.image1,
            title: '쎈 중등수학 2(하)'
        },
        {
            id: 1,
            image: IMAGES.image1,
            title: '쎈 중등수학 2(하)'
        },
        {
            id: 2,
            image: IMAGES.image2,
            title: '쎈 중등수학 2(하)'
        },
        {
            id: 3,
            image: IMAGES.image2,
            title: '쎈 중등수학 2(하)'
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
                itemWidth={responsiveScreenWidth(65)}px
             
                renderItem={BookDetailCard}
             
            />
          
        </View>


    );


}

export default DetailBook;