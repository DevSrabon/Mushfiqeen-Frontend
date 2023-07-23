import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Parent from "./Parent";
import { Login, PostDetails, Signup } from "../screen";
import { useAuth } from "../contexts/useAuth";
import { Loading } from "../components";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const { userData, token, loading } = useAuth();
  if (loading) return <Loading />;
  return (
    <NavigationContainer>
      {token ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="parent" component={Parent} />
          <Stack.Screen
            name="postDetails"
            component={PostDetails}
            // options={{
            //   presentation: "modal",
            //   animationTypeForReplace: "push",
            //   animation: "slide_from_right",
            // }}
          />
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
