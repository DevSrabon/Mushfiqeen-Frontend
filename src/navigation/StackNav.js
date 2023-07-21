import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Login, Post, PostDetails, Profile, Settings, Signup } from "../screen";
import { useAuth } from "../contexts/useAuth";
import BottomNavigator from "./BottomNavigator";
import DrawerNav from "./Drawer";

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const { userData } = useAuth();
  return (
    <NavigationContainer>
      {userData ? (
        <Stack.Navigator
          // initialRouteName={"Home"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="bottom" component={BottomNavigator} />
          {/* <Stack.Screen name="drawer" component={DrawerNav} /> */}
          <Stack.Screen name="post" component={Post} />
          <Stack.Screen name="postDetails" component={PostDetails} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName={"login"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={Signup} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default StackNav;
