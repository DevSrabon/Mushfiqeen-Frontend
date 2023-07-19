import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../screen/Login";
import Signup from "../screen/Signup";
import Home from "../screen/Home";

const Stack = createNativeStackNavigator();

const StackNav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={"home"}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="home" component={Home} />
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="signup" component={Signup} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNav;
