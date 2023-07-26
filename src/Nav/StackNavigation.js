import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Loading } from "../components";
import { useAuth } from "../contexts/useAuth";
import { BayanPost, Login, PostDetails, Signup } from "../screen";
import Parent from "./Parent";
import SkeletonMain from "../components/Skeleton/SkeletonMain";
import AnimationButton from "../components/AnimationButton";


const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const { userData, token, loading } = useAuth();
  if (loading) <Loading />;
  return (
    <NavigationContainer>
      {token ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="parent" component={Parent} />
          <Stack.Screen name="postDetails" component={PostDetails} />
          <Stack.Screen
            name="bayanPost"
            component={BayanPost}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="SkeletonMain" component={SkeletonMain} /> */}
          {/* <Stack.Screen name="AnimationButton" component={AnimationButton} /> */}
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={Signup} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default StackNavigation;
