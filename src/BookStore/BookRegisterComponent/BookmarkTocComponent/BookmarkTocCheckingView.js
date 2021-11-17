
import React, {useState} from 'react';
import {View, Text,useWindowDimensions, Pressable, TextInput, StyleSheet} from 'react-native';
import {responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth} from 'react-native-responsive-dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HeaderBackButton from '../../../Common/CommonComponent/HeaderBackButton';
import BasisButtonComponent from '../BasisButtonComponent';
import { registerBook } from '../../../Store/Actions';
import {connect} from 'react-redux';
import DraggableFlatList from 'react-native-draggable-flatlist';


export const tocCheckingStyles = StyleSheet.create({
    buttonStyle: {
        shadowOffset: {
            width: 3,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        shadowColor: 'gray',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    buttonTextStyle: {
        color: 'black',
        fontSize: responsiveScreenFontSize(0.9), 
        fontWeight: '600' 
    }
})


function BookmarkTocCheckingView({navigation, handleTocResult, handleMarkExist ,bookTocResult}) {

    const {width ,height} = useWindowDimensions();
    const [editable, setEditable] = useState(false);
    const [test, setTest] = useState(Math.random());

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

    React.useEffect(()=> {
        handleMarkExist(true);
    }, [])

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
        if(bookTocResult){
            console.log(index);
            bookTocResult.splice(index, 1);  
        }
        setTest(Math.random());
     }


    return (
        <View style={{width: '100%', height: '100%', alignItems: 'center', backgroundColor: 'white'}}>

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
                            내장된 목차를 찾았어요.  
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
                            data={bookTocResult}
                            onDragEnd={({ data }) => {
                                handleTocResult(data);
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
                            <BasisButtonComponent setEditable={setEditable} editable={editable} context={"편집할래요."}/>
                            <Pressable 
                                 onPress={()=> {
                                     navigation.push('DiffCheck')
                                }}
                                style={({pressed})=>[
                                        tocCheckingStyles.buttonStyle,
                                        {
                                            backgroundColor: pressed ? '#E8E8E8': '#F7F7F7',
                                            height: width > height ? responsiveScreenHeight(6) : responsiveScreenWidth(6),
                                            marginHorizontal: width > height ? responsiveScreenWidth(1) : responsiveScreenHeight(1),
                                
                                        }
                            ]}>
                        
                                <Text style={tocCheckingStyles.buttonTextStyle}>
                                        등록하기
                                </Text>
                            </Pressable>
                            <Pressable 
                                 onPress={()=> navigation.push('GetBookTitle')}
                                style={({pressed})=>[
                                        tocCheckingStyles.buttonStyle,
                                        {
                                            backgroundColor: pressed ? '#E8E8E8': '#F7F7F7',
                                            height: width > height ? responsiveScreenHeight(6) : responsiveScreenWidth(6),
                                            marginHorizontal: width > height ? responsiveScreenWidth(1) : responsiveScreenHeight(1),
                                        }
                            ]}>
                        
                            <Text style={tocCheckingStyles.buttonTextStyle}>
                                    너무 이상해요.
                            </Text>
                        </Pressable>
                         </View>
                        }

                    </View>
                </View>  
        </View>
    );


}

const mapDispatchToProps = (dispatch) => ({
    handleTocResult: (value)=>  dispatch(registerBook("bookTocResult", value)),
    handleMarkExist: (value)=> dispatch(registerBook("bookMarkExist", value))
});

const mapStateToProps = (state) => ({
    bookTocResult : state.registerBooks.bookRegisterObj.bookTocResult
});


export default connect(mapStateToProps, mapDispatchToProps)(BookmarkTocCheckingView);