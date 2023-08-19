import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { Bayan, Chats, Home, Post } from "../screen";
import colors from "../theme/Colors";
import { Protect } from "./ProtectedRoute";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const [isFocused, setIsFocused] = useState("home");
  const navRef = useRef(new Animated.Value(0)).current;
  const borderColorRef = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: colors.lightGray,
        tabBarActiveTintColor: colors.secondary,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: colors.bg,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "SemiBold",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Entypo
              name={"home"}
              size={focused ? 30 : 25}
              color={focused ? colors.white : colors.lightGray}
            />
          ),
        }}
      />
      <Tab.Group screenOptions={{ presentation: "modal" }}>
        <Tab.Screen
          name="Post"
          component={Post}
          options={{
            title: "Post",
            tabBarIcon: ({ focused, color }) => (
              <MaterialIcons
                name={"post-add"}
                size={focused ? 30 : 25}
                color={focused ? colors.white : colors.lightGray}
              />
            ),
          }}
        />
      </Tab.Group>

      <Tab.Screen
        name="Bayan"
        component={Bayan}
        options={{
          title: "Bayan",

          tabBarIcon: ({ focused, color }) => (
            <Entypo
              name={"sound"}
              size={focused ? 30 : 25}
              // size={24}
              color={focused ? colors.white : colors.lightGray}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Chats"
        component={Protect(Chats)}
        options={{
          title: "Chat",

          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              name={"chat"}
              size={focused ? 30 : 25}
              color={focused ? colors.white : colors.lightGray}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default BottomNavigation;
