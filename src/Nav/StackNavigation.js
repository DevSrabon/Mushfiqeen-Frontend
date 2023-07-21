import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Parent from "./Parent";
import { Login, PostDetails, Signup } from "../screen";
import { useAuth } from "../contexts/useAuth";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const { userData } = useAuth();
  return (
    <NavigationContainer>
      {userData ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="parent" component={Parent} />
          <Stack.Screen name="postDetails" component={PostDetails} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={Signup} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default StackNavigation;
