import React, {useState} from 'react';
import {View, Text, useWindowDimensions, StyleSheet, Image, Pressable, FlatList, ScrollView} from 'react-native';
import { responsiveFontSize, responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    PartPurchaseViewStyle: {
        width: '90%',

        backgroundColor: 'white',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row'
    },

    PartPurchaseLeftView: {
        width: '40%',
        height: '100%',
       // borderRightWidth: 1,
      //  borderWidth:1,
        alignItems: 'center',
        padding: 20
    },

    PartPurchaseRightView: {
        width: '60%',
        height: '100%',
        padding: 20,
       //backgroundColor: 'black'


    },

    BookTitleTextStyle: {
        fontSize: responsiveScreenFontSize(1.2),
        marginTop: '10%'
    },


    TocFieldViewStyle : {
        display: 'flex',
        flexDirection: 'row',
      //  borderWidth: 1,
        alignContent: 'space-between',
        marginVertical: 10,

        alignItems: 'center'
    }

})



function PartPurchaseView({navigation, selectedBook}) {
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const {width, height} = useWindowDimensions();
    let selectedItem = [];
    const [byToc, setByToc] = useState(true);
    const [reload, setReload] = useState(Math.random());
    const [recursiveData, setRecursiveData] = useState([
        {
          shopReportName: 'Name 1',
          shopId: 1,
          childs: [
            {
              shopReportName: 'Name 2',
              shopId: 2,
  
              childs: [
                {
                  shopReportName: 'Name 3',
                  shopId: 3,
   
                  childs: [
                    {
                      shopReportName: 'Name 4',
                      shopId: 4,
         
                      childs: [{
                        shopReportName: 'Name 6',
                        shopId: 6,
        
                        childs: [
                          {
                            shopReportName: 'Name 7',
                            shopId: 7,
             
                          },
                          {
                            shopReportName: 'Name 12',
                            shopId: 12,
                          },
                          {
                            shopReportName: 'Name 13',
                            shopId: 13,
                          },
                          {
                            shopReportName: 'Name 14',
                            shopId: 14,
                          },
                          {
                            shopReportName: 'Name 15',
                            shopId: 15,
                          },
                          {
                            shopReportName: 'Name 16',
                            shopId: 16,
                          },
                          {
                            shopReportName: 'Name 17',
                            shopId: 17,
                          }
                        ],
                      }],
                    },
                    {
                      shopReportName: 'Name 5',
                      shopId: 5,
                    },
                    {
                      shopReportName: 'Name 8',
                      shopId: 8,

                    },
                  ],
                },
              ],
            },
            {
                shopReportName: 'Name 11',
                shopId: 11
            }
          ],
        },
        {
            shopReportName: 'Name 9',
            shopId: 9,
            childs: [
                {
                    shopReportName: 'Name 10',
                    shopId: 10
                }
            ]
        }
      ]);

    const unTick = (data) => {

        data.tick = false;
        parent(data.parent);
        if(data.childs){
            data.childs.map(
                (item)=> {
                    unTick(item);
                }
            )
          
        }
            
    }

    const parent = (data) => {
        if(data && data.childs) {
            const countNotCheckedItem = data.childs.filter(child => !child.tick);

            if(countNotCheckedItem.length === 0){
                data.tick = true;
            }else {
                data.tick = false;
            }
            parent(data.parent);
        }
    }

    const onTick = (data) => {
        data.tick = true;
        parent(data.parent);
        if(data.childs){
            data.childs.map(
                (item) => {
                    onTick(item);
                }
            )
            
        }
    }


    const HierarchyDataRender = (item, index) => {

        if (!item.show) {
            item.show = false;
        }
        if (!item.tick) {
            item.tick = false;
        }
 
        return(
            <View style={{marginLeft: 20}}  key={item.shopId}>            
                <View>
                                
                    <View style={styles.TocFieldViewStyle}>
                            {item.childs ? 

                                <Icon name="chevron-right" size={15} style={{
                                    marginRight: 12
                                }}/> : 
                                <Icon name="circle" size={15} style={{
                                    marginRight: 12}}
                                />}
                                <CheckBox
                                    boxType='square'
                                    style={{
                                        marginRight: 10,
                                        width: 20,
                                        height: 20
                                    }}
                                    animationDuration={0.4}
                                    onAnimationType='fade'
                                    offAnimationType='fade'
                                    value={item.tick}
                                    onValueChange={()=> {
                                        if(!item.tick) {
                                            onTick(item);
                                            setReload(Math.random())
                                        }else {
                                            unTick(item); 
                                            setReload(Math.random())
                                        }

                                    }} />
                                        

                                <Text style={{
                                    // marginLeft: 3,
                                    fontSize: responsiveScreenFontSize(1),
                                    // textAlign: 'center',
                                    // marginBottom: 10
                                }} >{item.shopReportName}</Text>
                        </View>
    
                        {item.childs && item.childs.map(
                            (data, index) => {
                                if(!data.parent) {
                                    data.parent = item;
                                }
                                return HierarchyDataRender(data, index);
                            }
                        ) }
    
                    </View>
                          
            </View>
        );
    }

    const [text, setText] = useState("");
    const [pagesToBuy,setPagesToBuy] = useState({});
    const sellByPage = () => setByToc(false);
    const sellByToc = () => {
        setByToc(true);
        setPagesToBuy("");
    }
    const onChangeText = (select) => setText(select);

    const savePage = async(toSave) => {
        await AsyncStorage.setItem("@pagesBuy",JSON.stringify(toSave));
    }
    const delPage = (key) =>{
        const newPages = {...pagesToBuy};
        delete newPages[key];
        setPagesToBuy(newPages);
    }
    const addPage = () => {
        //const regex = /^[0-9|\,|\([0-9]{1,10}\-[0-9]{1,10}\)+]+$/;
        if(text===""){
            return;
        } 
        // else if(!regex.test(text)){
        //     Alert.alert(
        //         "알맞은 형태로 입력해주세요!",
        //         "ex 6,7,8,10-15"
        //     );
        //     setText("");
        //     return;
        // }
        const newPages = {
            ...pagesToBuy, 
            [Date.now()]: {text},
        };
        setPagesToBuy(newPages);
        //await savePage(newPages);
        //alert(text);
        setText("");
    }
    return (
        <View style={[
            styles.PartPurchaseViewStyle,
            {
                height:  width > height ? '100%' : '60%',
            }
        ]}>
                     
        
            <View style={styles.PartPurchaseLeftView}>
                <Text style={styles.BookTitleTextStyle}> {selectedBook.title}</Text>

                <Pressable onPress={()=> setImageModalVisible(true)} style={{marginTop: '10%'}}> 
                          
                    <Image
                        resizeMode='cover'
                        style={{
                            height: width > height ? responsiveScreenHeight(45): responsiveScreenWidth(40),
                            width:  width > height ? responsiveScreenWidth(24): responsiveScreenHeight(20),
                            borderWidth: 1,
                            borderColor: '#C2C2C2'
                
                            
                        }}
                        source={selectedBook.image}
                    
                    ></Image>
                </Pressable>
                <Text style={{
                    fontSize: responsiveScreenFontSize(1),
                    marginVertical: 5
                }}> 미리보기 </Text>
          
                
               
            </View>
 
                    
            <View style={styles.PartPurchaseRightView}>
                {/* if (byToc){ */}
                {byToc &&
                    <View 
                        isVisible={byToc}
                        style={{
                        height: '100%',
                        borderWidth: 1,
                        borderRadius: 15
                    }}>
                        <View style={{
                            height: '80%',
                        // borderWidth: 1
                        }}>
                            
                                <FlatList
                                    data={recursiveData}
                                    renderItem={({item,index})=> HierarchyDataRender(item, index)}
                                    keyExtractor={(item,index)=> item.shopId.toString()}
                                >
                                    
                                </FlatList>
                            
                    
                        </View>
                        <View style={{
                            backgroundColor: '#ABAAAA', 
                            height: '20%', 
                            borderTopWidth: 1,
                            borderBottomLeftRadius: 15,
                            borderBottomRightRadius: 15,
                            justifyContent: 'center',
                
                        }}>
                            <View style={{
                                display: 'flex',
                                flexDirection: width > height ? 'row': 'column',
                                paddingHorizontal: 15,
                                alignItems: width > height ? 'center' : null,
                                justifyContent: width > height ? null : 'center',
                                height: '50%',
                                width: '100%'
                            }}>
                                <Text style={{
                                    fontSize: width > height ? responsiveScreenFontSize(2.2) : responsiveScreenFontSize(1.7),
                                
                                    width: '30%',
                                        
                                }}>
                                    8,730₩
                                </Text>
                                <Pressable style={{
                                
                                }}>
                                    <Text 
                                    style={{
                                        color: '#256EDE',
                                        fontWeight: '500'
                                    }}
                                    onPress={sellByPage}
                                    >
                                        페이지 단위로 구매하기
                                    </Text>
                                </Pressable>
                                <Pressable style={({pressed}) => [
                                    {
                                        backgroundColor: pressed ? '#1440F9' : 'black',
                                    }, 
                                    {
                                    borderRadius: 25,
                            
                                    width: responsiveScreenWidth(13),
                                    height: '80%',
                                    position: 'absolute',
                                    alignItems: 'center',
                                    right: 5,
                                    justifyContent: 'center',
                                    }
                                ]}
                                    onPress={()=> {
                                        alert('구매하기 ㅎㅎ');
                                        console.log(recursiveData);
                                    }}>
        
                                    
                                <Text 
                                    style={{
                                        fontSize: responsiveScreenFontSize(1),
                                        color: 'white'
                                }}>구매하기</Text>
                
                                </Pressable>
                            </View>
                        </View>
                    </View>
                }
                {!byToc &&
                    <View 
                    isVisible={byToc}
                    style={{
                    height: '100%',
                    borderWidth: 1,
                    borderRadius: 15
                    }}>
                    <View style={{
                        height: '80%',
                    // borderWidth: 1
                    }}>
                        <View style={{
                        height: '10%',
                        marginHorizontal:'5%',
                        marginTop:'5%',
                        justifyContent:'center',
                        // borderWidth: 1
                        }}>
                            <Text style={{
                                fontSize:responsiveScreenFontSize(1),
                                textAlign:'center',
                                }}>
                                구매하고자 하는 페이지를 입력해주세요.
                            </Text>
                        </View>
                        <View
                            style={{
                                flex:1,
                                justifyContent:'center',
                                alignContent:'center',
                                flexDirection:'row'
                                }}
                        >
                            <View style={{flex:4, justifyContent:'center'}}>
                                <TextInput 
                                    style={{
                                    margin:10,
                                    height: '40%',
                                    width:'95%',
                                    borderWidth: 1,
                                    borderRadius: 15,
                                    paddingLeft:10,
                                    }}
                                    onChangeText={onChangeText}
                                    value={text}
                                    onSubmitEditing={addPage}
                                    placeholder=" ex 6,7,8,10-15"
                                >
                                </TextInput>
                            </View>

                            <View style={{flex:1,justifyContent:'center'}}>
                                <Pressable style={({pressed}) => [
                                    {
                                        backgroundColor: !pressed ? '#1440F9' : 'black',
                                    }, 
                                    {
                                        margin:5,
                                        height: '40%',
                                        width:'80%',
                                        borderWidth: 1,
                                        borderRadius: 20,
                                        justifyContent:'center',
                                        //backgroundColor:'#1440F9',
                                    }
                                    ]}
                                    onPress={addPage}
                                >
                                    <Text 
                                        style={{
                                            textAlign:'center',
                                            fontSize: responsiveScreenFontSize(1),
                                            color: 'white',
                                            fontWeight:'800'
                                    }}>담기</Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={{flex:4}}>
                            <ScrollView>
                                {Object.keys(pagesToBuy).map((key) => (
                                <View 
                                key={key}
                                style={{
                                    flexDirection:'row',
                                    margin:5,
                                    padding:10,
                                    paddingLeft:15,
                                    backgroundColor:`#dcdcdc`,
                                    // borderColor:'black',
                                    // borderWidth:1,
                                    borderRadius:10,
                                    alignItems:'center',
                                    justifyContent:'space-between'
                                    
                                }}
                                >
                                    <Text style={{
                                        fontWeight:'500',
                                        fontSize:responsiveFontSize(0.9),
                                    }}>{pagesToBuy[key].text}</Text>
                                    <TouchableOpacity onPress={() => delPage(key)}>
                                        <IconFeather name="x-square" size={20} color="red" />
                                    </TouchableOpacity>
                                </View>
                                ))}
                            </ScrollView>



                        </View>
                
                    </View>
                    <View style={{
                        backgroundColor: '#ABAAAA', 
                        height: '20%', 
                        borderTopWidth: 1,
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        justifyContent: 'center',
            
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: width > height ? 'row': 'column',
                            paddingHorizontal: 15,
                            alignItems: width > height ? 'center' : null,
                            justifyContent: width > height ? null : 'center',
                            height: '50%',
                            width: '100%',
                        }}>
                            <Text style={{
                                fontSize: width > height ? responsiveScreenFontSize(2.2) : responsiveScreenFontSize(1.7),
                            
                                width: '30%',
                                    
                            }}>
                                8,730₩
                            </Text>
                            <Pressable style={{
                            
                            }}>
                                <Text 
                                style={{
                                    color: '#256EDE',
                                    fontWeight: '500'
                                }}
                                onPress={sellByToc}
                                >
                                    목차 단위로 구매하기
                                </Text>
                            </Pressable>
                            <Pressable style={({pressed}) => [
                                {
                                    backgroundColor: pressed ? '#1440F9' : 'black',
                                }, 
                                {
                                borderRadius: 25,
                        
                                width: responsiveScreenWidth(13),
                                height: '80%',
                                position: 'absolute',
                                alignItems: 'center',
                                right: 5,
                                justifyContent: 'center',
                                }
                            ]}
                                onPress={()=> {
                                    alert('구매하기 ㅎㅎ');
                                    console.log(recursiveData);
                                }}>

                                
                            <Text 
                                style={{
                                    fontSize: responsiveScreenFontSize(1),
                                    color: 'white'
                            }}>구매하기</Text>
            
                            </Pressable>
                        </View>
                    </View>
                </View>
                
                
                }
                {/* }
                else{
                    <View>
                        <Text>hi</Text>
                    </View>
                } */}
            </View>

            <Modal 
                isVisible={imageModalVisible}
                useNativeDriver={true}
                style={{ 
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                hideModalContentWhileAnimating={true} 
                onSwipeComplete={()=> setImageModalVisible(false)}
                >
               
                <TouchableOpacity 
                        onPress={() => setImageModalVisible(false)}>
                        <Icon name="times-circle" size={30} color="white" />
                </TouchableOpacity>
                <Image
                    resizeMode='contain'
                    style={{
                        margin: 5,
                        height: '100%',
                        width: '100%',              
  
                    }}
                    source={selectedBook.image}
                    
                />
            
            </Modal>
        </View>
    );
}

export default PartPurchaseView;