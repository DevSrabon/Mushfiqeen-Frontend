import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { Login, Post, PostDetails, Signup } from "../screen";

import { useAuth } from "../contexts/useAuth";


import BottomNavigator from "./BottomNavigator";

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const {userData}=useAuth()
  return (
    <NavigationContainer>
           {userData ? (
       <Stack.Navigator
       initialRouteName={"Home"}
       screenOptions={{ headerShown: false }}
     >
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
