import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BookRegisterLandingView from './BookRegisterComponent/BookRegisterLandingView';
import BookStores from './BookStoreComponent/BookStores';
import BookRegisterFileUploadView from './BookRegisterComponent/BookRegisterFileUploadView';
import BookmarkTocCheckingView from './BookRegisterComponent/BookmarkTocComponent/BookmarkTocCheckingView';
import PDFTocPageGetView from './BookRegisterComponent/OurTocLogicContinuosComponent/PDFTocPageGetView';
import PDFRowCountGetView from './BookRegisterComponent/OurTocLogicContinuosComponent/PDFRowCountGetView';
import ZakduAnalyzeTocCheckinigView from './BookRegisterComponent/OurTocLogicContinuosComponent/ZakduAnalyzeTocCheckingView';
import BookNameView from './BookRegisterComponent/BookInfoRegisterComponent/BookNameView';
import BookAuthorView from './BookRegisterComponent/BookInfoRegisterComponent/BookAuthorView';
import BookPublisherView from './BookRegisterComponent/BookInfoRegisterComponent/BookPublisherView';
import BookPubDateView from './BookRegisterComponent/BookInfoRegisterComponent/BookPubDateView';
import BookIntroView from './BookRegisterComponent/BookInfoRegisterComponent/BookIntroView';
import BookPriceView from './BookRegisterComponent/BookInfoRegisterComponent/BookPriceView';
import BookCategoryView from './BookRegisterComponent/BookInfoRegisterComponent/BookCategoryView';
import BookCoverView from './BookRegisterComponent/BookInfoRegisterComponent/BookCoverView';
import BookmarkEmptyView from './BookRegisterComponent/BookmarkTocComponent/BookmarkEmptyView';
import BookPageDiffCheck from './BookRegisterComponent/BookPageDiffCheck';
import BookRegisterComplete from './BookRegisterComponent/BookRegisterComplete';
import BookRegisterFail from './BookRegisterComponent/BookRegisterFail';

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
            name="BookMarkEmpty" 
            options={{
                title: '책 등록하기',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={BookmarkEmptyView}/>                 


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

            <Stack.Screen 
            name="ZakduLogicChecking" 
            options={{
                title: '책 등록하기',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={ZakduAnalyzeTocCheckinigView}/> 

            <Stack.Screen 
            name="DiffCheck" 
            options={{
                title: '책 등록하기',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={BookPageDiffCheck}/> 

            <Stack.Screen 
            name="GetName" 
            options={{
                title: '책 등록하기',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={BookNameView}/>  

            <Stack.Screen 
            name="GetAuthor" 
            options={{
                title: '책 등록하기',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={BookAuthorView}/>       

            <Stack.Screen 
            name="GetPublisher" 
            options={{
                title: '책 등록하기',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={BookPublisherView}/>  



            <Stack.Screen 
            name="GetPubDate" 
            options={{
                title: '책 등록하기',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={BookPubDateView}/>  

            <Stack.Screen 
            name="GetIntro" 
            options={{
                title: '책 등록하기',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={BookIntroView}/>  

             <Stack.Screen 
            name="GetPrice" 
            options={{
                title: '책 등록하기',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={BookPriceView}/>            

            <Stack.Screen 
            name="GetCategory" 
            options={{
                title: '책 등록하기',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={BookCategoryView}/>       

            <Stack.Screen 
            name="GetCover" 
            options={{
                title: '책 등록하기',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={BookCoverView}/>    

            <Stack.Screen 
            name="RegisterComplete" 
            options={{
                title: '책 등록하기',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={BookRegisterComplete}/>    

             <Stack.Screen 
            name="RegisterFail" 
            options={{
                title: '책 등록하기',
                headerStyle: {
                    backgroundColor: '#F3F3F3'
                }
            }}
            component={BookRegisterFail}/>                 
            
        </Stack.Navigator>
    )
}


export default BookStore;