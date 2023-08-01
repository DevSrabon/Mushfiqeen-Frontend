import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

import React from "react";
import { useAuth } from "../contexts/useAuth";
import { BayanPost, Login, PostDetails, Signup } from "../screen";
import ForgetPass from "../screen/ForgetPass";
import VerifyCode from "../screen/VerifyCode";
import Parent from "./Parent";
// import UpdateProfile from "../screen/UpdateProfile";

// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

const StackNavigation = () => {
  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  const { loading } = useAuth();
  // if (loading) return <Loading />;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        // initialRouteName="login"
      >
        {/* <Stack.Screen name="UpdateProfile" component={UpdateProfile} /> */}
        {/* <Stack.Screen name="UpdateProfile" component={UpdateProfile} /> */}

        <Stack.Screen name="parent" component={Parent} />
        <Stack.Screen
          name="postDetails"
          options={{
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
          component={PostDetails}
        />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="verifyCode" component={VerifyCode} />
        <Stack.Screen name="forgetPass" component={ForgetPass} />
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
