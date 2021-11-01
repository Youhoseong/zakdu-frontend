import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MyPageHome from "./MyPageComponent/MyPageHome";
import PersonalInfo from "./MyPageComponent/PersonalInfo";
import Profiles from "./MyPageComponent/Profiles";
import PurchaseHistory from "./MyPageComponent/PurchaseHistory";

const Stack = createStackNavigator();

function MyPage (){

    return(
        <Stack.Navigator>
            <Stack.Screen
            name="MyPageHome"
            component={MyPageHome}
            options={{
                title: '마이페이지'
            }}/>

            <Stack.Screen
            name="Profiles"
            component={Profiles}
            options={{
                title: '프로필 변경'
            }}/>

            <Stack.Screen
            name="PersonalInfo"
            component={PersonalInfo}
            options={{
                title: '개인정보'
            }} />

            <Stack.Screen
            name="PurchaseHistory"
            component={PurchaseHistory}
            options={{
                title: '구매내역'
            }} />
        </Stack.Navigator>
    )
}

export default MyPage;