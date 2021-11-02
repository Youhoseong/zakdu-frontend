import React, { useState, useEffect } from 'react';
import {View, Text, Button, useWindowDimensions, FlatList, Image, Pressable, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import DetailBook from './DetailBook';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import PartPurchaseView from './PartPurchaseView';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';







function BookStores({navigation}) {
    const [detailBookVisible, setDetailBookVisible] = useState(false);
    const [partBookPurchaseVisible, setPartBookPurchaseVisible] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);

    const gotoPartPurchaseView = (currentIndex) => {
        setSelectedBookId(currentIndex);
        setDetailBookVisible(false);
        setTimeout(function(){setPartBookPurchaseVisible(true)}, 600);
        //navigation.push('PartPurchase', {'selectedBook': currentIndex});
    }


    const {width, height} = useWindowDimensions();

    const IMAGES = {
        image1: require('../../Assets/images/img.png'),
        image2: require('../../Assets/images/images.jpeg')
    };
    
    const [books, setBooks] = useState([
        { 
            id: 0, 
            image: IMAGES.image1,
            title: '쎈 중등수학 2(하)',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            detailContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            id: 1,
            image: IMAGES.image1,
            title: '쎈 중등수학 2(하)',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            detailContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },

        {
            id: 2,
            image: IMAGES.image2,
            title: '쎈 중등수학 2(하)',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            detailContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            id: 3,
            image: IMAGES.image2,
            title: '쎈 중등수학 2(하)',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            detailContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
    
    ]);

    const BookStoreBookListRender = (item, index) => {
        return (
            <View>
                <Pressable onPress={
                    () => {
                        setSelectedBookId(item.id);
                        setDetailBookVisible(true);
                    }
                    
                }
                style={{
                  
                    height: '98%'
                    
                }}
                >
                <Image 
                    resizeMode='cover'
                    source={item.image}
                    style={{
                        width: width > height ? responsiveScreenWidth(14) : responsiveScreenHeight(14),
                        marginHorizontal: 10,
                        height: '100%',
                        borderWidth: 1,
                        borderColor: '#C2C2C2',
                                              
                  
                    }}
                ></Image>
                </Pressable>
            </View>
    
        );
    }

    

    return (
        <ScrollView style={{
            backgroundColor: 'white',
        }}>

            <View style={{
                
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.3,
                shadowRadius: 7,
            }}>
                <Text style={{
                    fontSize: responsiveScreenFontSize(1.5),
                    fontWeight: '600',
                    marginHorizontal: 30,
                    marginTop: 25,
                    marginBottom: 15
                }}>
                    문제집
                </Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    height: width > height ? responsiveScreenHeight(28) : responsiveScreenWidth(28),
                   
                }}>
                    <FlatList
                        horizontal
                        data={books}
                        renderItem={({item,index})=> BookStoreBookListRender(item, index)}
                        keyExtractor={(item,index)=> item.id.toString()}
                    />
                </View>



            </View>
            <View style={{
                
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.3,
                shadowRadius: 7,
            }}>
                <Text style={{
                    fontSize: responsiveScreenFontSize(1.5),
                    fontWeight: '600',
                    marginHorizontal: 30,
                    marginTop: 50,
                    marginBottom: 15
                }}>
                    전공 서적
                </Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    height: width > height ? responsiveScreenHeight(28) : responsiveScreenWidth(28),
                   
                }}>
                    <FlatList
                        horizontal
                        data={books}
                        renderItem={({item,index})=> BookStoreBookListRender(item, index)}
                        keyExtractor={(item,index)=> item.id.toString()}
                    />
                </View>



            </View>
            <View style={{
                
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.3,
                shadowRadius: 7,
            }}>
                <Text style={{
                    fontSize: responsiveScreenFontSize(1.5),
                    fontWeight: '600',
                    marginHorizontal: 30,
                    marginTop: 50,
                    marginBottom: 15
                }}>
                    호성이가 만든 책
                </Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    height: width > height ? responsiveScreenHeight(28) : responsiveScreenWidth(28),
                   
                }}>
                    <FlatList
                        horizontal
                        data={books}
                        renderItem={({item,index})=> BookStoreBookListRender(item, index)}
                        keyExtractor={(item,index)=> item.id.toString()}
                    />
                </View>



            </View>



            <Modal 
                isVisible={detailBookVisible}
                useNativeDriver={true}
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                onBackdropPress={()=> setDetailBookVisible(false)}
                hideModalContentWhileAnimating={true} 
                onSwipeComplete={()=>setDetailBookVisible(false)}>
            
                <TouchableOpacity 
                        onPress={() => setDetailBookVisible(false)} >
                        <Icon name="times-circle" size={30} color="white" />
                </TouchableOpacity>
                <DetailBook gotoSecond={gotoPartPurchaseView} bookId={selectedBookId}/>

            </Modal>

            <Modal 
                isVisible={partBookPurchaseVisible}
                useNativeDriver={true}
                style={{ 
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onBackdropPress={()=> setPartBookPurchaseVisible(false)}
                hideModalContentWhileAnimating={true} 
                onSwipeComplete={()=>setDetailBookVisible(false)}>
               
                <TouchableOpacity 
                        onPress={() => setPartBookPurchaseVisible(false)} style={{margin: 5}}>
                        <Icon name="times-circle" size={30} color="white" />
                </TouchableOpacity>

                <PartPurchaseView  selectedBook={selectedBookId}/>

      
            </Modal>
        
        </ScrollView>
  
    );


}
export default BookStores;