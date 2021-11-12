import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MyPageHome from "./MyPageComponent/MyPageHome";
import PersonalInfo from "./MyPageComponent/PersonalInfo";
import Profiles from "./MyPageComponent/Profiles";
import PurchaseHistory from "./MyPageComponent/PurchaseHistory";

const MyPageStack = createStackNavigator();

function MyPage () {

    return(
        <MyPageStack.Navigator>
            <MyPageStack.Screen
            name="MyPageHome"
            component={MyPageHome}
            options={{
                title: '마이페이지'
            }}/>

            <MyPageStack.Screen
            name="Profiles"
            component={Profiles}
            options={{
                title: '프로필 변경'
            }}/>

            <MyPageStack.Screen
            name="PersonalInfo"
            component={PersonalInfo}
            options={{
                title: '개인정보'
            }} />

            <MyPageStack.Screen
            name="PurchaseHistory"
            component={PurchaseHistory}
            options={{
                title: '구매내역'
            }} />
        </MyPageStack.Navigator>
    )
}

export default MyPage;