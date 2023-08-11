import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ReactionDetails from "../components/reactionDetails";
import { BayanPost, Chat, Login, PostDetails, Signup } from "../screen";
import ForgetPass from "../screen/ForgetPass";
import ProBayan from "../screen/ProBayan";
import ProPost from "../screen/ProPost";
import ProfileInfo from "../screen/ProfileInfo";
import VerifyCode from "../screen/VerifyCode";
import NavStr from "./NavStr";
import Parent from "./Parent";

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
        }}
      >
        <Stack.Screen name={NavStr.PARENT} component={Parent} />
        <Stack.Group
          screenOptions={{
            presentation: "modal",
          }}
        >
          <Stack.Screen name={NavStr.PROFILE_POST} component={ProPost} />
          <Stack.Screen name={NavStr.PROFILE_BAYAN} component={ProBayan} />
        </Stack.Group>

        <Stack.Screen
          name={NavStr.POSTDETAILS}
          component={PostDetails}
          options={topToBottomAnimation}
        />
        <Stack.Screen name={NavStr.PROFILE} component={ProfileInfo} />
        <Stack.Screen
          name={NavStr.LOGIN}
          component={Login}
          options={topToBottomAnimation}
        />
        <Stack.Screen
          name={NavStr.SIGNUP}
          component={Signup}
          options={bottomToTopAnimation}
        />
        <Stack.Screen
          name={NavStr.FORGET}
          component={ForgetPass}
          options={leftToRightAnimation}
        />
        <Stack.Screen
          name={NavStr.VERIFYCODE}
          component={VerifyCode}
          options={rightToLefttAnimation}
        />
        <Stack.Screen
          name={NavStr.BAYAN_POST}
          component={BayanPost}
          options={leftToRightAnimation}
        />
        <Stack.Screen
          name={NavStr.CHAT}
          component={Chat}
          options={leftToRightAnimation}
        />
        <Stack.Screen
          name={NavStr.REACTION}
          component={ReactionDetails}
          options={rightToLefttAnimation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const leftToRightAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [-layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const rightToLefttAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const bottomToTopAnimation = {
  gestureDirection: "vertical",
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
};

const topToBottomAnimation = {
  gestureDirection: "vertical",
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [-layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
};

export default StackNavigation;

//           //options  fo Modal
//    <Stack.Group screenOptions={{ presentation: "modal" }}>
//   <Stack.Screen name={NavStr.LOGIN} component={Login} />
//   <Stack.Screen name={NavStr.SIGNUP} component={Signup} />
// </Stack.Group>;
