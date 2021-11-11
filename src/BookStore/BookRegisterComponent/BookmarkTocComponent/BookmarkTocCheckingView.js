
import React, {useState} from 'react';
import {View, Text, Button, FlatList, useWindowDimensions, Pressable, TextInput, Vibration} from 'react-native';
import  {HS_API_END_POINT} from '../../../Shared/env';
import {responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth} from 'react-native-responsive-dimensions';
import Animation from 'lottie-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HeaderBackButton from '../../../Common/CommonComponent/HeaderBackButton';
import BasisButtonComponent from '../BasisButtonComponent';
import Modal from 'react-native-modal';

import DraggableFlatList, {ScaleDecorator} from 'react-native-draggable-flatlist';
import BookmarkEmptyView from './BookmarkEmptyView';


function BookmarkTocCheckingView({navigation, route}) {
    const {fileObj} = route.params;
    const {bookmarkResult} = route.params;
    const {tocResult} = route.params;

    const [bookRegisterObj, setBookRegisterObj] = useState(fileObj);
    const {width ,height} = useWindowDimensions();
    const [editable, setEditable] = useState(false);

    const [test, setTest] = useState(Math.random());
    const [tResult, setTResult] = useState(tocResult);


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


    const HierarchyDataRender = (item, drag, isActive, index) => {
        const onPlusPress = () => {
            if(item.childs) {
                item.childs = [...item.childs, {
                    id: Math.random(),
                    text: '',
                    childs: null
                }]
            } else {
                item.childs = [{
                    id: Math.random(),
                    text: '',
                    childs: null,
                }]
            }
            setTest(Math.random());
         }

         const onMinusPress = (index) => {
            //console.log(id);
            if(item.childs){
                console.log(index);
                item.childs.splice(index, 1);
               
            }
            setTest(Math.random());
         }

        return(
        
            <View 
                style={[
                    {
                        borderWidth: isActive ? 2 : 0,
                        borderRadius: isActive ? 15 : 0,
                        borderColor: isActive ? 'red': null
                    },
                    {
                    width: '85%',
                    marginHorizontal: 20, 
                    marginVertical: 10
                     }
            ]}  
                key={index}>    
                        <View style={[
                            {
                            paddingVertical: 10,
                            width: '100%',
                            display:'flex', 
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderColor: 'gray',
                            alignItems: 'center'
                            }
                        ]}>  
                                <MaterialCommunityIcons name="circle-medium" size={20}/>

                                {editable ?
                                <View style={{
                                    width: '100%',
                            
                                }}>
                                <TextInput 
                                            editable={true}
                                            onChangeText={(text)=>{
                                                item.text = text;
                                                console.log(text);
                                                setTest(Math.random());
                                            }}
                                            value={item.text}
                                            style={{
                                            width: '65%',
                                                
                                            fontSize: responsiveScreenFontSize(1),      
                                        }}>

                                </TextInput>
                                <View style={{
                                    position: 'absolute',
                                    right: 0,
                                    width: '20%',
                                    //borderWidth:1,
                                    display: 'flex',
                                    flexDirection: 'row',
                                  
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Pressable 
                                        onPress={()=> {
                                                onPlusPress(index); 
                                        }}
                                        style={{
                                            marginHorizontal: 5
                                        
                                        }}>
                                        <MaterialCommunityIcons name="plus-circle-outline" size={24} />
                                    </Pressable>

                       

                                    <Pressable 
                                        onLongPress={drag}
                                        //disabled={isActive}
                                        style={[
                                            { 
    
                                                marginHorizontal: 5
                                            },
                                        ]}>
                            
                                        <MaterialCommunityIcons name="menu" size={22} 
                                            color={isActive ? 'red': 'gray'}
                                        />
                                    </Pressable>
                                </View>
                                </View> :

                                <Text style={{
                                    fontSize: responsiveScreenFontSize(1),      
                                }} >{item.text}</Text>
                                }
                        </View>
        

   

                        {item.childs ? 
                            <View style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                      
                            }}>
                                <DraggableFlatList
                                    scrollEnabled={false}
                                    data={item.childs}
                                    onDragEnd={({ data }) => {
                                        item.childs = data;
                                        setTest(Math.random());
                        
                                    }}
                                    keyExtractor={(item, index) => index.toString()}
                                    listKey={(item, index)=> 'D' + index.toString()}
                                    renderItem={({ item, drag, isActive, index }) => (
                                        <View style={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'row',
                                  
                                        }}>
                                    
                                        {HierarchyDataRender(item, drag, isActive, index)}
                                        {editable ?
                                        <Pressable  
                                                style={{
                                                    marginTop: 24,
                                                    marginHorizontal: 5,
                                           
                                                    width: '10%'
                                                }}
                                                onPress={()=> onMinusPress(index)}
                                                >
                                                <Text style={{
                                                    color: 'red'
                                                }}>삭제</Text>
                                               
                                            </Pressable> :
                                            null
                                        }
                                        </View>
                                    )}
                                />  
                         

                            </View>
                            :
                            null
                        }  
             
            </View>

        );
    }

    const onMinusPress = (index) => {
        if(tResult){
            console.log(index);
            tResult.splice(index, 1);  
        }
        setTest(Math.random());
     }


    return (
        <View style={{width: '100%', height: '100%', alignItems: 'center', backgroundColor: 'white'}}>

            {bookmarkResult ? 
                <View style={{ 
                    width: width > height ? '50%' : '70%',
                    height: width > height ? '100%' : '100%',
                    alignItems: 'center',

                     }}>   
                     <View style={{  
                         marginTop: '3%', 
                         width: '100%', 
                         height: width > height ? '11%': '9%'
                       
                    }}>
                        
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
                        height: '72%',
                        borderColor: editable ? 'red' : 'black',
                        borderWidth: 1,
                        borderRadius: 15,
                    }}>
                    
                        <DraggableFlatList
                            data={tResult}
                            onDragEnd={({ data }) => {
                                setTResult(data);
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            listKey={(item, index)=> 'D' + index.toString()}
                            renderItem={({ item, drag, isActive, index }) => (
                                <View style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                          
                                }}>
                            
                                {HierarchyDataRender(item, drag, isActive, index)}
                                {editable ?
                                <Pressable  
                                        style={{
                                            marginTop: 24,
                                            marginHorizontal: 5,
                                   
                                            width: '10%'
                                        }}
                                        onPress={()=> onMinusPress(index)}
                                        >
                                        <Text style={{
                                            color: 'red'
                                        }}>삭제</Text>
                                       
                                    </Pressable> :
                                    null
                                }
                                </View>
                            )}
                        />

                        
                    </View>
                    <View style={{
                        height: '12%', 
                        width: '100%', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        {editable ?
                        <BasisButtonComponent setEditable={setEditable} editable={editable} context={"저장"} bColor='red' bFocusColor='#2A3AC4'/>:
                    
                        <View style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <BasisButtonComponent setEditable={setEditable} editable={editable} context={"편집할래요."} bColor='gray' bFocusColor='#2A3AC4'/>
                            <BasisButtonComponent context={"이대로 등록할래요."} bColor='#2A3AC4' bFocusColor='#3448F3'/>
                            <Pressable 
                                 onPress={()=> navigation.push('GetBookTitle', {
                                    'fileObj': bookRegisterObj
                                })}
                                style={({pressed})=>[
                                    
                                        {
                                            backgroundColor: pressed ? '#243AC4': 'gray',
                                            width: '30%',
                                            height: width > height ? responsiveScreenHeight(6) : responsiveScreenWidth(6),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginHorizontal: width > height ? responsiveScreenWidth(1) : responsiveScreenHeight(1),
                                            borderRadius: 30,
                                        }
                            ]}>
                        
                            <Text style={{color: 'white',fontSize: responsiveScreenFontSize(1.0)}}>
                                    너무 이상해요.
                            </Text>
                        </Pressable>
                         </View>
                        }

                    </View>
                </View> : 
                <BookmarkEmptyView bookRegisterObj={bookRegisterObj} navigation={navigation}/>
               
            }

      
                           
           
        </View>
    );


}
export default BookmarkTocCheckingView;