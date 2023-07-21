import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { Login, Signup } from "../screen";

import { useAuth } from "../contexts/useAuth";

import Loading from "../components/loading";
import BottomNavigator from "./BottomNavigator";

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const { userData, token, loading } = useAuth();
  if (loading) return <Loading />;
  return (
    <NavigationContainer>
      {token ? (
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
