
import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView, FlatList,Pressable, useWindowDimensions} from 'react-native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

const DATA = [
    {
      id: 0,
      image: require('../../Assets/images/img2.png'),
      title: 'Hidden Markov Models',
    },
    {
        id: 1,
      image: require('../../Assets/images/images.jpeg'),
      title: '초등학생을 위한 과학 이야기 356편',
    },
    {
        id: 2,
        image: require('../../Assets/images/img.png'),
        title: '쎈 중등수학',
    },
    {
        id: 3,
        image: require('../../Assets/images/images.jpeg'),
        title: '초등학생을 위한 과학 이야기 356편',
    },
    {
        id: 4,
        image: require('../../Assets/images/img.png'),
        title: '쎈 중등수학',
    },
    {
        id: 5,
        image: require('../../Assets/images/images.jpeg'),
        title: '초등학생을 위한 과학 이야기 356편',
    },
    {
        id: 6,
        image: require('../../Assets/images/img.png'),
        title: '쎈 중등수학',
    },
    {
        id: 7,
        image: require('../../Assets/images/images.jpeg'),
        title: '초등학생을 위한 과학 이야기 356편',
    },
    
  ];


const Item = ({ item, onPress, width, height,  }) => (
  <View style={{
        alignItems: 'center',
        height: width > height ? responsiveScreenHeight(37) : responsiveScreenHeight(25),
        flex: 1
    }}>  
      <Pressable onPress={onPress} style=
          {({pressed}) => [
            styles.pressItemStyle, 
            {
              padding: pressed ? 10 : 20,
              width: width > height ? '75%' : '90%',     
            }
          ]}>

            <Image 
              resizeMode="cover" 
              source={item.image}
              style={styles.image} />
               
        </Pressable>
        <Text style={[styles.title]}>{item.title}</Text>
    </View>
  );
  
const BookShelfHome = ({navigation}) => {
    const {width, height} = useWindowDimensions();
    const [selectedId, setSelectedId] = useState(null);
    const numColumns = 4;

    const renderItem = ({ item }) => {
  
      return (
        <Item
          item={item}
          width={width}
          height={height}
          onPress={() => {
            setSelectedId(item.id);
            navigation.push('ReadingBook', {
              book_id: item.id
            });
          }}

        />
      );
    };
  
    return (
      <SafeAreaView style={styles.container}>

        <View style={{alignItems: 'center', width: '100%', marginTop: '3%'}}>
          <Text style={{
            textAlign: 'left',
            width: '90%',
            marginBottom: '1%',
            fontSize: responsiveScreenFontSize(1.5),
            fontWeight: '600',
    
          }}>보관함 </Text>
          <View style={{width: '90%', borderBottomWidth: 1, borderBottomColor: 'gray'}}/>
        </View>

        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          numColumns={numColumns}
        />
      </SafeAreaView>
    );
  };


  const styles = StyleSheet.create({
    bookBox: {
        margin:'5%',
        alignItems:'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 30,
    },
    pressItemStyle: { 
        height: '90%',
        alignItems:'center',
        shadowColor: 'gray',
        shadowOffset: {
          width: 3,
          height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 30
    },
    image: {
      width: '100%',
      height: '100%',
      borderWidth:1,
      borderColor: '#C2C2C2',
      borderRadius: 5

    },
    title: {
        width: '100%',
        textAlign: 'center',
        height: '10%',
        overflow: 'hidden',
        fontSize: responsiveScreenFontSize(0.9)
    },


})

export default BookShelfHome;

