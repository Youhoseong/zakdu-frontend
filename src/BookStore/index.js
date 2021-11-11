import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BookRegisterLandingView from './BookRegisterComponent/BookRegisterLandingView';
import BookStores from './BookStoreComponent/BookStores';
import BookRegisterFileUploadView from './BookRegisterComponent/BookRegisterFileUploadView';
import BookmarkTocCheckingView from './BookRegisterComponent/BookmarkTocComponent/BookmarkTocCheckingView';
import PDFTocPageGetView from './BookRegisterComponent/OurTocLogicContinuosComponent/PDFTocPageGetView';
import PDFRowCountGetView from './BookRegisterComponent/OurTocLogicContinuosComponent/PDFRowCountGetView';

const Stack = createStackNavigator();


function BookStore ({navigation}) {

    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="BookShop" 
            options={{
                title: '북스토어',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={BookStores}/>
            
            <Stack.Screen 
            name="BookRegister" 
            options={{
                title: '책 등록하기',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={BookRegisterLandingView}/>
            
            <Stack.Screen 
            name="BookRegisterFileUpload" 
            options={{
                title: '책 등록하기',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={BookRegisterFileUploadView}/>

            <Stack.Screen 
            name="BookMarkChecking" 
            options={{
                title: '책 등록하기',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={BookmarkTocCheckingView}/>          


            <Stack.Screen 
            name="GetBookTitle" 
            options={{
                title: '책 등록하기',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={PDFTocPageGetView}/>      

            <Stack.Screen 
            name="GetRowCount" 
            options={{
                title: '책 등록하기',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={PDFRowCountGetView}/>      



           

            
            
        </Stack.Navigator>
    )
}


export default BookStore;