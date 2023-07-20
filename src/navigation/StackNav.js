import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useAuth } from "../contexts/useAuth";
import Home from "../screen/Home";
import Login from "../screen/Login";
import Signup from "../screen/Signup";

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const { userData } = useAuth();
  return (
    <NavigationContainer>
      {userData ? (
        <Stack.Navigator
          initialRouteName={"home"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="home" component={Home} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName={"login"}
          screenOptions={{ headerShown: false }}
        >
          {/* <Stack.Screen name="home" component={Home} /> */}
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={Signup} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default StackNav;
