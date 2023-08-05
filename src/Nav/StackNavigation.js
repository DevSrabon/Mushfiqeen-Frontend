import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BayanPost, Login, PostDetails, Signup } from "../screen";
import ForgetPass from "../screen/ForgetPass";
import VerifyCode from "../screen/VerifyCode";
import UpdateProfile from "../screen/UpdateProfile";
import ProfileInfo from "../screen/ProfileInfo";
import NavStr from "./NavStr";
import AuthProvider from "../contexts/useAuth";
import { NavigationContainer } from "@react-navigation/native";
import Parent from "./Parent";

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

  // const { loading } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={NavStr.PARENT} component={Parent} />
        <Stack.Screen
          name={NavStr.POSTDETAILS}
          options={{
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
          component={PostDetails}
        />
        <Stack.Screen name={NavStr.PROFILE} component={ProfileInfo} />
        <Stack.Screen name={NavStr.LOGIN} component={Login} />
        <Stack.Screen name={NavStr.SIGNUP} component={Signup} />
        <Stack.Screen name={NavStr.FORGET} component={ForgetPass} />
        <Stack.Screen name={NavStr.VERIFYCODE} component={VerifyCode} />
        <Stack.Screen name={NavStr.BAYAN_POST} component={BayanPost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
