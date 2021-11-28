
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
    View, 
    Text, 
    Image, 
    StyleSheet, 
    SafeAreaView, 
    FlatList,Pressable, 
    useWindowDimensions,

} from 'react-native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import * as RNFS from 'react-native-fs'


const Item = ({ item, onPress, width, height,  }) => (
  <View style={{
        alignItems: 'center',
        height: width > height ? responsiveScreenHeight(37) : responsiveScreenHeight(25),
        flex: 0.25
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
        <Text numberOfLines={1} style={[styles.title]}>{item.title}</Text>
    </View>
  );
  
const BookShelfHome = ({navigation}) => {
    const {width, height} = useWindowDimensions();
    const [selectedId, setSelectedId] = useState(null);
    const [bookData, setBookData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
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

    const refreshItems = async () => {
        setRefreshing(true);
        var existKeys = bookData.map(data => "pdf_" + data.id);
        var existKeySet = new Set(existKeys);

        var keys = await AsyncStorage.getAllKeys()
        keys = keys.filter(key => !existKeySet.has(key) && key.includes("pdf_"));
        
        addData(keys);
        setRefreshing(false);
    }

    const addData = (keys) => {
        const pdfBookCoverPath = RNFS.DocumentDirectoryPath + "/pdfCover/"

        keys.forEach(async (key) => {
            const dataStr = await AsyncStorage.getItem(key);
            const item = JSON.parse(dataStr);
            console.log(key);
            console.log(item);
            if(item === null) return;
            const data = {
                id: item.book_id,
                image: {uri: pdfBookCoverPath + item.coverFileName},
                title: item.title
            }
            setBookData(bookData => [...bookData, data])
        });
    } 

    useEffect(() => {
        refreshItems();
        console.log(bookData);
    }, [])
  
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
          data={bookData}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={refreshItems}
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

