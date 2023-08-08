import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { Bayan, Chats, Home, Post } from "../screen";
import colors from "../theme/Colors";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const [isFocused, setIsFocused] = useState("home");
  const navRef = useRef(new Animated.Value(0)).current;
  const borderColorRef = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  const handleTabPress = (tabName, route) => {
    if (isFocused !== tabName) {
      setIsFocused(tabName);
      Animated.spring(navRef, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      Animated.timing(borderColorRef, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
      navigation.navigate({ name: route });
    }
  };

  const handleTabBlur = () => {
    setIsFocused(null);
    Animated.timing(borderColorRef, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: colors.lightGray,
        tabBarActiveTintColor: colors.white,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: colors.bg,
        },
        tabBarLabelStyle: {
          bottom: 5,
          fontFamily: "Regular",
        },
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const tabName = route.name;
          const isCurrentTabFocused = tabName === isFocused;

          const scale = navRef.interpolate({
            inputRange: [0, 1],
            outputRange: [1, isCurrentTabFocused ? 1.2 : 1],
          });

          const translateY = navRef.interpolate({
            inputRange: [0, 1],
            outputRange: [0, isCurrentTabFocused ? -5 : 0],
          });

          const backgroundColor = navRef.interpolate({
            inputRange: [0, 1],
            outputRange: [colors.bg, isCurrentTabFocused ? 0 : colors.bg],
          });

          return (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleTabPress(tabName, route.name)}
              onBlur={handleTabBlur}
            >
              <Animated.View
                style={{
                  transform: [{ scale }, { translateY }],
                  backgroundColor,
                  borderRadius: 50,
                  padding: 2,
                }}
              >
                {tabName === "Home" && (
                  <Entypo
                    name="home"
                    size={24}
                    color={focused ? colors.white : colors.lightGray}
                    style={focused && styles.homeFocused}
                  />
                )}
                {tabName === "Post" && (
                  <View style={focused && styles.focused}>
                    <MaterialIcons
                      name="post-add"
                      size={24}
                      color={focused ? colors.white : colors.lightGray}
                    />
                  </View>
                )}
                {tabName === "Bayan" && (
                  <View style={focused && styles.focused}>
                    <Entypo
                      name="sound"
                      size={24}
                      color={focused ? colors.white : colors.lightGray}
                    />
                  </View>
                )}
                {tabName === "Chat" && (
                  <View style={focused && styles.focused}>
                    <MaterialIcons
                      name="chat"
                      size={24}
                      color={focused ? colors.white : colors.lightGray}
                    />
                  </View>
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        },
      })}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Entypo
              name={"home"}
              size={24}
              color={focused ? colors.white : colors.lightGray}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          title: "Post",
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              name={"post-add"}
              size={24}
              color={focused ? colors.white : colors.lightGray}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Bayan"
        component={Bayan}
        options={{
          title: "Bayan",
          tabBarIcon: ({ focused, color }) => (
            <Entypo
              name={"sound"}
              size={24}
              color={focused ? colors.white : colors.lightGray}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          title: "Chat",
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              name={"chat"}
              size={24}
              color={focused ? colors.white : colors.lightGray}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  focused: {
    borderTopWidth: 3,
    // borderLeftWidth: 3,
    // borderRightWidth: 3,
    // borderRadius: 7,
    paddingHorizontal: 9,
    borderColor: colors.white,
    paddingTop: 1,
    alignItems: "center",
  },
  homeFocused: {
    borderTopWidth: 3,
    borderColor: colors.white,
    paddingRight: 5,
    paddingLeft: 11,
    borderColor: colors.white,
    paddingTop: 1,
    alignItems: "center",
  },
});

export default BottomNavigation;
