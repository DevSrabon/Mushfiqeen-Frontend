import React from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Bayan, Chat, Home, Post } from "../screen";
import colors from "../theme/Colors";
import NavStr from "./NavStr";

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  const navigation = useNavigation();

  const handleTabPress = (route) => {
    navigation.navigate(route);
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

          return (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleTabPress(route.name)}
            >
              <View
                style={{
                  backgroundColor: focused ? colors.bg : colors.bg,
                  borderRadius: 50,
                  padding: 2,
                }}
              >
                {tabName === "Home" && (
                  <Entypo
                    name="home"
                    size={24}
                    color={focused ? colors.white : colors.lightGray}
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
              </View>
            </TouchableOpacity>
          );
        },
      })}
    >
      <Tab.Screen name={NavStr.HOME} component={Home} />
      <Tab.Screen name={NavStr.POST} component={Post} />
      <Tab.Screen name={NavStr.BAYAN} component={Bayan} />
      <Tab.Screen name={NavStr.CHAT} component={Chat} />
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
});
