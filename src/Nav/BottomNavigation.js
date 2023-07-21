import { Animated, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import colors from "../theme/Colors";
import { Home, Post, Bayan, Chat } from "../screen";
import { useRef, useState } from "react";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const [isFocused, setIsFocused] = useState("home");
  const navRef = useRef(new Animated.Value(0)).current;

  const handleTabPress = (tabName, route, navigation) => {
    if (isFocused !== tabName) {
      setIsFocused(tabName);
      Animated.spring(navRef, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Tab.Navigator
      // backBehavior="Main"
      initialRouteName="home"
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: colors.lightGray,
        tabBarActiveTintColor: colors.white,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: colors.bg,
        },
        tabBarLabelStyle: {
          bottom: 5,
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
            outputRange: [0, isCurrentTabFocused ? -20 : 0],
          });

          const backgroundColor = navRef.interpolate({
            inputRange: [0, 1],
            outputRange: [
              colors.bg,
              isCurrentTabFocused ? colors.primary : colors.bg,
            ],
          });

          return (
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => handleTabPress(tabName, route)}
            >
              <Animated.View
                style={{
                  transform: [{ scale }, { translateY }],
                  backgroundColor,
                  borderRadius: 20,
                  padding: 5,
                }}
              >
                {tabName === "home" && (
                  <Entypo
                    name="home"
                    size={24}
                    color={focused ? colors.white : colors.lightGray}
                  />
                )}
                {tabName === "post" && (
                  <MaterialIcons
                    name="post-add"
                    size={24}
                    color={focused ? colors.white : colors.lightGray}
                  />
                )}
                {tabName === "bayan" && (
                  <Entypo
                    name="sound"
                    size={24}
                    color={focused ? colors.white : colors.lightGray}
                  />
                )}
                {tabName === "chat" && (
                  <MaterialIcons
                    name="chat"
                    size={24}
                    color={focused ? colors.white : colors.lightGray}
                  />
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
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            handleTabPress("home", "home", navigation);
          },
        })}
      />
      <Tab.Screen
        name="post"
        component={Post}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            handleTabPress("post", "post", navigation);
          },
        })}
      />
      <Tab.Screen
        component={Bayan}
        name="bayan"
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            handleTabPress("bayan", "bayan", navigation);
          },
        })}
      />
      <Tab.Screen
        name="chat"
        component={Chat}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            handleTabPress("chat", navigation);
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
