import React, {useState} from 'react';
import {View, Text, useWindowDimensions, StyleSheet, Image,ScrollView, Pressable} from 'react-native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CheckboxTree from 'react-native-checkbox-tree';

import CheckBox from '@react-native-community/checkbox';
import { ScrollViewBase } from 'react-native';

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
    //const {selectedBook} = route.params;

    const recursiveData = [
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
          ],
        },
      ];
    
      const setCheckStateWithChild = () => {

      }

      const HierarchyDataRender = ({data, checkValue}) => {
        return(
            <View style={{marginLeft: 20}}>            
                {data.map(
                    (item) => {
                        return(
                            <View key={item.shopId}>
    
                                <View style={styles.TocFieldViewStyle}>
                                    {item.childs ? 
                                        <Icon name="chevron-right" size={18} style={{
                                            marginRight: 12
                                        }}/> : 
                                        <Icon name="circle" size={18} style={{
                                            marginRight: 12}}
                                        />}
                                    <CheckBox
                                        boxType='square'
                                        style={{
                                            marginRight: 10
                                        }}
                                        value={checkValue}
                               
                                        
                                    />
                                    <Text style={{
                                    // marginLeft: 3,
                                        fontSize: responsiveScreenFontSize(1),
                                    // textAlign: 'center',
                                    // marginBottom: 10
                                    }} >{item.shopReportName}</Text>
                                </View>
    
                                {item.childs ? <HierarchyDataRender data={item.childs} checkValue={checkValue} />: null}
    
                            </View>
                         
                        )
                    }
                )}
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
                    <ScrollView>
                        <HierarchyDataRender data={recursiveData} checkValue={true}/>
                    </ScrollView>
                    </View>
                    <View style={{
                        backgroundColor: '#ABAAAA', 
                        //shadowOpacity: '20%',
                        height: '20%', 
                        borderTopWidth: 1,
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        borderBottomWidth: 1                     
                    }}>
                            <Text>
                                
                            </Text>
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
                }}>
               
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