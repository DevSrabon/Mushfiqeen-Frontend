import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ReactionDetails from "../components/reactionDetails";
import { BayanPost, Chat, Login, PostDetails, Signup } from "../screen";
import ForgetPass from "../screen/ForgetPass";
import ProfileInfo from "../screen/ProfileInfo";
import VerifyCode from "../screen/VerifyCode";
import NavStr from "./NavStr";
import Parent from "./Parent";

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={NavStr.PARENT} component={Parent} />
        <Stack.Screen name={NavStr.POSTDETAILS} component={PostDetails} />
        <Stack.Screen name={NavStr.PROFILE} component={ProfileInfo} />
        <Stack.Screen name={NavStr.LOGIN} component={Login} />
        <Stack.Screen name={NavStr.SIGNUP} component={Signup} />
        <Stack.Screen name={NavStr.FORGET} component={ForgetPass} />
        <Stack.Screen name={NavStr.VERIFYCODE} component={VerifyCode} />
        <Stack.Screen name={NavStr.BAYAN_POST} component={BayanPost} />
        <Stack.Screen name={NavStr.REACTION} component={ReactionDetails} />
        <Stack.Screen name={NavStr.CHAT} component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
