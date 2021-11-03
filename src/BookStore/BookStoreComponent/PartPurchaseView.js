import React, {useEffect, useState} from 'react';
import {View, Text, useWindowDimensions, StyleSheet, Image,ScrollView, Pressable, FlatList} from 'react-native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckBox from '@react-native-community/checkbox';

const styles = StyleSheet.create({
    PartPurchaseViewStyle: {
        width: '90%',
        height: '100%',
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

 

    return (
        <View style={styles.PartPurchaseViewStyle}>
                     
        
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

                <View style={{
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
                        borderBottomWidth: 1,
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                fontSize: responsiveScreenFontSize(2.2),
                                marginLeft: 15,
                                width: '30%',
                                     
                            }}>
                                8,730₩
                            </Text>
                            <Pressable style={{
                                borderRadius: 20,
                                padding: 2,
                                width: responsiveScreenWidth(13),
                                backgroundColor: '#0A84FF',
                                justifyContent: 'center',
                                
                            }}
                            onPress={()=> {
                                alert('구매하기 ㅎㅎ');
                                console.log(recursiveData);
                            }}>
                                <Text style={{
                                    fontSize: responsiveScreenFontSize(1),
                                    textAlign: 'center',
                                    color: 'white'

                                }}>구매하기</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
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