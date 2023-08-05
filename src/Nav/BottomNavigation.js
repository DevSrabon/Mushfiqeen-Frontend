import React, { useRef, useState } from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Animated, TouchableOpacity, View, StyleSheet } from "react-native";
import { Bayan, Chat, Home, Post } from "../screen";
import colors from "../theme/Colors";
import NavStr from "./NavStr";

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  const [isFocused, setIsFocused] = useState("home");
  const navRef = useRef(new Animated.Value(0)).current;
  const borderColorRef = useRef(new Animated.Value(0)).current; // Animated value for border color

  const navigation = useNavigation();

  const handleTabPress = (tabName, route) => {
    if (isFocused !== tabName) {
      setIsFocused(tabName);
      Animated.spring(navRef, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      Animated.timing(borderColorRef, {
        // Animate the border color change
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
      // Animate the border color change back to the default
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  return (
    <Tab.Navigator
      initialRouteName={NavStr.HOME}
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: colors.lightGray,
        tabBarActiveTintColor: colors.white,

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
            outputRange: [
              colors.bg,
              isCurrentTabFocused ? 0 : colors.bg,
              // isCurrentTabFocused ? colors.primary : colors.bg,
              // isCurrentTabFocused ? colors.bg : colors.bg,
            ],
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

                  // borderWidth: 1,
                  // borderColor: colors.white,
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
        name={NavStr.HOME}
        component={Home}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            handleTabPress("Home", "Home", navigation);
          },
        })}
      />
      <Tab.Screen
        name={NavStr.POST}
        component={Post}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            handleTabPress("Post", "Post", navigation);
          },
        })}
      />
      <Tab.Screen
        name={NavStr.BAYAN}
        component={Bayan}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            handleTabPress("Bayan", "Bayan", navigation);
          },
        })}
      />
      <Tab.Screen
        name={NavStr.CHAT}
        component={Chat}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            handleTabPress("Chat", "Chat", navigation);
          },
        })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  focused: {
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderRadius: 7,
    paddingHorizontal: 9,
    borderColor: colors.white,
    paddingTop: 1,
    alignItems: "center",
  },
  homeFocused: {
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderRadius: 7,
    borderColor: colors.white,
    paddingRight: 5,
    paddingLeft: 11,

    borderColor: colors.white,
    paddingTop: 1,
    alignItems: "center",
  },
});
