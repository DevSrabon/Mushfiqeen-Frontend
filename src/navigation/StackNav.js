import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Login, Post, PostDetails, Signup } from "../screen";
import BottomNavigator from "./BottomNavigator";

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Home"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="post" component={Post} />
        <Stack.Screen name="postDetails" component={PostDetails} />

        <Stack.Screen name="Home">
          {() => (
            <Stack.Navigator
              initialRouteName="home"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="home" component={BottomNavigator} />
            </Stack.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
