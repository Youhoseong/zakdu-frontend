import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, Button, useWindowDimensions, FlatList, Image, Pressable, ScrollView, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import DetailBook from './DetailBook';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import PartPurchaseView from './PartPurchaseView';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const styles = StyleSheet.create({
    imageStyle: {
        marginHorizontal: 10,
        height: '100%',
        borderWidth: 1,
        borderColor: '#C2C2C2',
    },
    catergoryViewStyle: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    catergoryTitleStyle: {
        fontSize: responsiveScreenFontSize(1.5),
        fontWeight: '600',
        marginHorizontal: 30,
        marginTop: 25,
        marginBottom: 15
    },
    searchBarViewStyle: {
        width: '100%', 
        height: '6%', 
        alignItems: 'center', 
        marginTop: 20,
    },
    searchBarView2Style: {
        width: '90%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        display:'flex',
        flexDirection: 'row',
        borderWidth:1,
        borderColor: '#DADADA',
        borderRadius: 15,
        backgroundColor: '#E9E9E9',

    
    }
})


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
                    style={[
                        {
                            width: width > height ? responsiveScreenWidth(14) : responsiveScreenHeight(14),
                        },
                        styles.imageStyle
                    ]}
                ></Image>
                </Pressable>
            </View>
    
        );
    }

    

    return (
        <View style={{
            width: '100%',
            height: '100%'
        }}>
        <ScrollView style={{
            backgroundColor: 'white',
            width: '100%'
        }}>

            <View style={styles.catergoryViewStyle }>
                <View style={styles.searchBarViewStyle}> 

                    <View style={styles.searchBarView2Style}>
                        <TextInput 
                            placeholder="검색..."
                            style={{
                                width: '90%',
                                height: '100%',
                            }}>
                        </TextInput>   
                        <MaterialCommunityIcons name="magnify" size={20} />
                    </View>
                </View>
                <Text style={styles.catergoryTitleStyle}>
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

                <View style={{
                    width: '100%',
                    borderBottomWidth: 1,
                    marginTop: 50,
                    marginBottom: 20,
                    borderBottomColor: '#EAEAEA'
                }}/>

                <Pressable style={{
                    marginHorizontal: 25,
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontSize: responsiveScreenFontSize(0.8)
                    }}> 
                        모두 보기
                    </Text>
                    <MaterialCommunityIcons name="chevron-right" size={27} />
                    
                </Pressable>

            </View>
            <View style={styles.catergoryViewStyle }>
                <Text style={[
                    styles.catergoryTitleStyle,
                    {
                        marginTop: 50
                    },
                 
                ]}>
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

                <View style={{
                    width: '100%',
                    borderBottomWidth: 1,
                    marginTop: 50,
                    marginBottom: 20,
                    borderBottomColor: '#EAEAEA'
                }}/>

                <Pressable style={{
                    marginHorizontal: 25,
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontSize: responsiveScreenFontSize(0.8)
                    }}> 
                        모두 보기
                    </Text>
                    <MaterialCommunityIcons name="chevron-right" size={27} />
                    
                </Pressable>



            </View>
            <View style={styles.catergoryViewStyle }>
                <Text style={[
                    styles.catergoryTitleStyle,
                    {
                        marginTop: 50
                    },
                 
                ]}>
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

                <View style={{
                    width: '100%',
                    borderBottomWidth: 1,
                    marginTop: 50,
                    marginBottom: 20,
                    borderBottomColor: '#EAEAEA'
                }}/>

                <Pressable style={{
                    marginHorizontal: 25,
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontSize: responsiveScreenFontSize(0.8)
                    }}> 
                        모두 보기
                    </Text>
                    <MaterialCommunityIcons name="chevron-right" size={27} />
                    
                </Pressable>


            </View>
{/* 
   
            <View style={{borderWidth:1,bottom:0,alignSelf:'flex-end'}}>
                <Button
                    title="Press"
                    color="#841584"
                    accessibilityLabel="Press"/>
            </View> */}
    

            <Modal 
                isVisible={detailBookVisible}
                useNativeDriver={true}
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                onBackdropPress={()=> setDetailBookVisible(false)}
                hideModalContentWhileAnimating={true} 
                onSwipeComplete={()=>setDetailBookVisible(false)}
                animationIn= "zoomInDown"
                animationOut="zoomOutUp"
            >
            
                   
            <TouchableOpacity 
                        onPress={() => setDetailBookVisible(false)} style={{margin: 5}}>
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
        
        <Pressable 
            style={({pressed}) => [
            {
                backgroundColor: pressed ? '#2A50EE' : 'black',
            }, 
            {
                width: 70,
                height: 70,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems:'center',
                position: 'absolute',
                bottom: 20,
                right: 20
            }]}
            onPress={()=> {
                navigation.push('BookRegister');
            }}

        >
         <Text style={{
             color: 'white',
             fontSize: responsiveScreenFontSize(2),
             textAlign: 'center',
   

         }}>+</Text>
        </Pressable>
        
   

        </View>
  
    );


}
export default BookStores;