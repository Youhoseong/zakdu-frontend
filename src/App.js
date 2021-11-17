import React from 'react';
import {SafeAreaView, StyleSheet, Text,WebView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Navigator from './Navigator';
import configureStore from './Store/Reducer/index'
import {Provider} from 'react-redux';

const {store} = configureStore();

const App = () => {
 
  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
  );
};



export default App;
