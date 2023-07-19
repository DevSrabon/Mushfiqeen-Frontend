import { Text, Platform, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import colors from "../theme/Colors";
import { Home, Post, Bayan, Chat } from "../screen";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    height: 60,
    background: "#fff",
  },
};
export default function BottomNavigator() {
  return (
    <>
      <Tab.Navigator
        backBehavior="Main"
        initialRouteName="Main"
        screenOptions={screenOptions}
      >
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Entypo
                    name="home"
                    size={24}
                    color={focused ? `${colors.bg}` : "#111"}
                  />
                  <Text>HOME</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="post"
          component={Post}
          options={{
            title: "Post",
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <MaterialIcons
                    name="post-add"
                    size={24}
                    color={focused ? `${colors.bg}` : "#111"}
                  />
                  <Text style={{ fonSize: 12, color: "#16247d" }}>Post</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="bayan"
          component={Bayan}
          options={{
            title: "Bayan",
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: colors.bg,
                      width: Platform.OS == "ios" ? 50 : 60,
                      height: Platform.OS == "ios" ? 50 : 60,
                      top: Platform.OS == "ios" ? -10 : -20,
                      borderRadius: Platform.OS == "ios" ? 25 : 30,
                    }}
                  >
                    <Entypo name="sound" size={24} color="#fff" />
                  </View>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="chat"
          component={Chat}
          options={{
            title: "Chat",
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <MaterialIcons
                    name="chat"
                    size={24}
                    color={focused ? `${colors.bg}` : "#111"}
                  />
                  <Text style={{ fonSize: 12, color: "#16247d" }}>Chat</Text>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
}
