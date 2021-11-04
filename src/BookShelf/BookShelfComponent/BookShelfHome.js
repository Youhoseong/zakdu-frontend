import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView, FlatList, Pressable} from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const DATA = [
    {
      id: 0,
      image: require('../../Assets/images/img.png'),
      title: 'First item',
    },
    {
        id: 1,
      image: require('../../Assets/images/images.jpeg'),
      title: 'Second Item',
    },
    {
        id: 2,
        image: require('../../Assets/images/img.png'),
      title: 'Third Item',
    },
    {
        id: 3,
        image: require('../../Assets/images/images.jpeg'),
        title: '4th item',
    },
    {
        id: 4,
        image: require('../../Assets/images/img.png'),
      title: '5th item',
    },
    {
        id: 5,
        image: require('../../Assets/images/images.jpeg'),
      title: '6th Item',
    },
    {
        id: 6,
        image: require('../../Assets/images/img.png'),
      title: '7th Item',
    },
    {
        id: 7,
        image: require('../../Assets/images/images.jpeg'),
        title: '8th item',
    },
    
  ];

const IMAGES = {
    image1: require('../../Assets/images/img.png'),
    image2: require('../../Assets/images/images.jpeg')
};

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <Pressable onPress={onPress} style={[styles.item2, backgroundColor]}> 
        <Image source={item.image} style={styles.image}/>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
    </Pressable>
  );
  
const BookShelfHome = ({navigation}) => {
    const [selectedId, setSelectedId] = useState(null);
  
    const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "gray" : null;
      const color = item.id === selectedId ? 'blue' : 'black';
  
      return (
        <Item
          item={item}
          onPress={() => {
            setSelectedId(item.id);
            navigation.push('HomeScreen')
          }}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          numColumns='4'
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
        marginTop: 10,
        marginHorizontal: 10,
    },
    item2: {
        flex:1,
        alignItems:'center',
        padding: 20,
        height: screenHeight*0.43,
        marginVertical: screenHeight*0.01,
        //marginHorizontal: 20,
    },
    title: {
        marginTop:5,
        fontSize: screenHeight*0.03,
    },
    image: {
        //height: 300,
        flex:1,
        resizeMode: 'contain',

    },

})





export default BookShelfHome;

// function BookShelfHome({navigation}) {

//     return (
//         <ScrollView contentContainerStyle={{flex:1}}>

//             <View style={{
//                 flex:1,
//                 flexDirection:'row',
//                 backgroundColor:'green'
//                 }}>
//                 <View style={{flex:1, backgroundColor:'red'}}>
//                     <TouchableOpacity style={styles.bookBox}>
//                         <Image source={IMAGES.image1} style={styles.item}/>
//                         <Text style={styles.text}>쎈 고등수학(상)</Text>
//                     </TouchableOpacity>
//                 </View>
                
//                 <View style={{flex:1, backgroundColor:'blue'}}>
//                     <TouchableOpacity style={styles.bookBox}>
//                         <Image source={IMAGES.image2} style={styles.item}/>
//                         <Text style={styles.text}>초등학생을 위한 과학이야기</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={{flex:1, backgroundColor:'red'}}>
//                     <TouchableOpacity style={styles.bookBox}>
//                         {/* <Image source={IMAGES.image1} style={styles.item}/>
//                         <Text style={styles.text}>aaaaaaaaaaaaaaa</Text> */}
//                     </TouchableOpacity>
//                 </View>
//                 <View style={{flex:1}}>
//                     <TouchableOpacity style={styles.bookBox}>
//                         {/* <Image source={IMAGES.image1} style={styles.item}/>
//                         <Text style={styles.text}>aaaaaaaaaaaaaaa</Text> */}
//                     </TouchableOpacity>
//                 </View>
//             </View>
//             <View style={{flex:1}}>

//             </View>

//         </ScrollView>
//     )
// }
