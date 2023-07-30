import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useAuth } from "../contexts/useAuth";
import { BayanPost, Login, PostDetails, Signup } from "../screen";
import VerifyCode from "../screen/VerifyCode";
import Parent from "./Parent";
// import UpdateProfile from "../screen/UpdateProfile";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const { loading } = useAuth();
  // if (loading) return <Loading />;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        // initialRouteName="verifyCode"
      >
        {/* <Stack.Screen name="UpdateProfile" component={UpdateProfile} /> */}

        <Stack.Screen name="parent" component={Parent} />
        <Stack.Screen name="postDetails" component={PostDetails} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="verifyCode" component={VerifyCode} />
        <Stack.Screen
          name="bayanPost"
          component={BayanPost}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
