
import React, {useState} from 'react';
import {View, Text, Button, FlatList, useWindowDimensions, Pressable} from 'react-native';
import  {HS_API_END_POINT} from '../../Shared/env';
import {responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth} from 'react-native-responsive-dimensions';
import Animation from 'lottie-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HeaderBackButton from '../../Common/CommonComponent/HeaderBackButton';

function BookmarkTocCheckingView({navigation, route}) {
    const {fileObj} = route.params;
    const {bookmarkResult} = route.params;

    const {tocResult} = route.params;
    const [bookRegisterObj, setBookRegisterObj] = useState(fileObj);
    const {width ,height} = useWindowDimensions();

    const HierarchyDataRender = (item, index) => {

        if (!item.show) {
            item.show = false;
        }
        if (!item.tick) {
            item.tick = false;
        }
 
        return(
            <View style={{
                width: '90%',
                marginLeft: 20, 
                borderWidth:1, 
                marginVertical: 10}}  key={item.id}>            
                <View>                       
                        <View style={{display:'flex', flexDirection: 'row'}}>  
                                <MaterialCommunityIcons name="circle-small" size={28}/>
                                <Text style={{
                                    fontSize: responsiveScreenFontSize(1),      
                                }} >{item.text}</Text>
                        </View>
    
                        {item.childs && item.childs.map(
                            (data, index) => {
                                if(!data.parent) {
                                    data.parent = item;
                                }
                                return HierarchyDataRender(data, index);
                            }
                        )}
    
                    </View>
                          
            </View>
        );
    }
    React.useLayoutEffect(() => {     
        navigation.setOptions({       
            headerStyle: {
                backgroundColor: 'white',
            },
            headerLeft: ()=> {
                return(
                    <HeaderBackButton navigation={navigation}/>
                );
            },
        });   
    }, [navigation]);



    return (
        <View style={{width: '100%', height: '100%', alignItems: 'center', backgroundColor: 'white'}}>

            {bookmarkResult ? 
                <View style={{ 
                    width: width > height ? '50%' : '70%',
                    height: width > height ? '100%' : '100%',
                    alignItems: 'center',
                    borderWidth: 1
                     }}>   
                     <View style={{  marginTop: '3%', width: '100%', height: '10%', borderWidth: 1}}>
                        
                        <Text style={{ fontSize: responsiveScreenFontSize(1.5), fontWeight: '700'}}>
                            목차를 찾았어요.    
                        </Text>

                      
                        <Text 
                            style={{
                                marginTop : 10,
                                fontSize: responsiveScreenFontSize(1.2),
                                fontWeight: '100'
                            }}>
                            목차를 기반으로 도서를 자동 분할 합니다.
                        </Text>

                    </View>
                    <View style={{
                        width: '100%',
                        height: '75%',
                        
                    }}>
                        <FlatList
                                data={tocResult}
                                renderItem={({item,index})=> HierarchyDataRender(item, index)}
                                keyExtractor={(item,index)=> item.id.toString()}>
                    
                        </FlatList>
                    </View>
                    <View style={{height: '12%', borderWidth: 1, width: '100%', alignItems: 'flex-end', justifyContent: 'flex-end'}}>

                        <Pressable 
                            style={({pressed})=>[
                            {
                                backgroundColor: pressed ? '#2A3AC4' : '#3448F3',
                                width: '50%',
                                height: width > height ? responsiveScreenHeight(6) : responsiveScreenWidth(6),
                                justifyContent: 'center',
                                alignItems: 'center',

                                borderRadius: 30,
                            }
                        ]}>
                        
                            <Text style={{color: 'white',fontSize: responsiveScreenFontSize(1.0)}}>
                                다음 단계
                            </Text>
                        </Pressable>
                    </View>
                </View> : 

                <View style={{ 
                    width: width > height ? '30%' : '50%',
                    height: width > height ? '100%' : '80%',
                    alignItems: 'center',
                    borderWidth: 1
                }}>
                    <Text>{bookRegisterObj.bookFile.name}</Text>
                    <View style={{  marginTop: 100, width: '100%', height: '20%'}}>
                        
                        <Text style={{ fontSize: responsiveScreenFontSize(1.5), fontWeight: '700'}}>
                            텅.     
                        </Text>

                        <Text style={{marginTop: 10, fontSize: responsiveScreenFontSize(1.3), fontWeight: '500',}}>
                            내장된 목차를 찾을 수 없어요.           
                        </Text>
                    </View>
                    <Animation
                            style={{width: 300,  height: 300}}
                            source={require('../../Assets/json/8021-empty-and-lost.json')} 
                            autoPlay
                            resizeMode= 'cover'/>

                    <Pressable 
                        style={({pressed})=>[
                        {
                            backgroundColor: pressed ? '#2A3AC4' : '#3448F3',
                            width: '100%',
                            height: width > height ? responsiveScreenHeight(6) : responsiveScreenWidth(6),
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 100,
                            borderRadius: 30,
                        }
                    ]}>
                      
                        <Text style={{color: 'white',fontSize: responsiveScreenFontSize(1.0)}}>
                            다음 단계
                        </Text>
                    </Pressable>
                </View>
            }

      
                           
           
        </View>
    );


}
export default BookmarkTocCheckingView;