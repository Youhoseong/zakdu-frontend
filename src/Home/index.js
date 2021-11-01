import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {View, Text,Animated, Pressable, StyleSheet} from 'react-native';
import HomeScreen from './HomeComponent/HomeScreen';
import Test from './HomeComponent/Test';
import { HeaderStyleInterpolators } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
    HeaderBackIconStyle: {
        marginHorizontal: 15
    }


})


function Home ({navigation}) {

    const forFade = ({ current, next }) => {
        const opacity = Animated.add(
          current.progress,
          next ? next.progress : 0
        ).interpolate({
          inputRange: [0, 1, 2],
          outputRange: [0, 1, 0],
        });
      
        return {
          leftButtonStyle: { opacity },
          rightButtonStyle: { opacity },
          titleStyle: { opacity },
          backgroundStyle: { opacity },
        };
      };

    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="HomeScreen" 
            component={HomeScreen}
            options={{
                title: '읽고 있는 책',
                headerStyle: {
                 
                },
                headerLeft: ({})=> {
                    return(
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}> 
                            <Pressable style={styles.HeaderBackIconStyle}>
                                <Icon name="chevron-left" size={25} color="#BDBDBD" />
                            </Pressable>

                            <Pressable style={styles.HeaderBackIconStyle}>
                                <Icon name="th-list" size={25} color="#BDBDBD"/>
                            </Pressable>

               
                        </View>
                    )
                },
                headerRight: ({})=> {
                    return(
                        <View>
                            <Text>실험</Text>
                            <Text>실험</Text>
                            <Text>실험</Text>
                        </View>
                    )
                }
                
            }}
            
            />
            

            <Stack.Screen 
            name="Test" 
            component={Test}
            options={{
                title: '테스트입니닷'
            }} />
            
        </Stack.Navigator>
    )
}


export default Home;