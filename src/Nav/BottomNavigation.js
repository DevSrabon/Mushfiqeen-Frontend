import { Text, Platform, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import colors from "../theme/Colors";
import { Home, Post, Bayan, Chat } from "../screen";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
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
      }}
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
        name="post"
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
        name="bayan"
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
        name="chat"
        component={Chat}
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

export default BottomNavigation;
