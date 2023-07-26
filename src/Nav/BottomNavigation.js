import React, { useRef, useState } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import colors from "../theme/Colors";
import { Home, Post, Bayan, Chat } from "../screen";

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
      Animated.timing(borderColorRef, { // Animate the border color change
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
      navigation.navigate({ name: route });
    }
  };

  const handleTabBlur = () => {
    setIsFocused(null);
    Animated.timing(borderColorRef, { // Animate the border color change back to the default
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };


  return (
    <Tab.Navigator
      // backBehavior="Main"
      initialRouteName="Home"
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
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => handleTabPress(tabName, route.name)}
              onBlur={handleTabBlur}
            >
              <Animated.View
                style={
                  {
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

                    style={focused && {
                      borderWidth: 2,
                      borderColor: colors.white,
                      borderRadius: 20,
                      paddingHorizontal: 9,
                      paddingRight: 5,
                      paddingTop: 1,
                      alignItems: "center",
                    }}
                  />
                )}
                {tabName === "Post" && (
                  <View
                    style={focused && {
                      borderWidth: 2,
                      borderColor: colors.white,
                      borderRadius: 20,
                      paddingHorizontal: 9,
                      paddingBottom: 4,
                      paddingTop: 1,
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons
                      name="post-add"
                      size={24}
                      color={focused ? colors.white : colors.lightGray}

                      // style={focused && {
                      //   borderWidth: 1,
                      //   borderColor: colors.white,
                      //   borderRadius: 50,
                      //   padding: 3,
                      // }}
                    />

                  </View>
                )}
                {tabName === "Bayan" && (
                  <View
                    style={focused && {
                      borderWidth: 2,
                      borderColor: colors.white,
                      borderRadius: 20,
                      paddingHorizontal: 9,
                      paddingBottom: 2,
                      paddingTop: 1,
                      alignItems: "center",
                    }}
                  >
                    <Entypo
                      name="sound"
                      size={24}
                      color={focused ? colors.white : colors.lightGray}

                    // style={focused && {
                    //   borderWidth: 1,
                    //   borderColor: colors.white,
                    //   borderRadius: 50,
                    //   padding: 2,
                    // }}

                    />
                  </View>
                )}
                {tabName === "Chat" && (
                  <View
                    style={focused && {
                      borderWidth: 2,
                      borderColor: colors.white,
                      borderRadius: 20,
                      paddingHorizontal: 9,
                      // paddingBottom: 4,
                      paddingTop: 1,
                      alignItems: "center",
                    }}
                  >
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
        name="Home"
        component={Home}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            handleTabPress("Home", "Home", navigation);
          },
        })}
      />
      <Tab.Screen
        name="Post"
        component={Post}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            handleTabPress("post", "post", navigation);
          },
        })}
      />
      <Tab.Screen
        name="Bayan"
        component={Bayan}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            handleTabPress("bayan", "bayan", navigation);
          },
        })}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            handleTabPress("chat", navigation);
          },
        })}
      />
    </Tab.Navigator>
  );
}
