import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import colors from "../theme/Colors";
import icons from "../../assets/icons";
import { Profile, Settings } from "../screen";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Pressable onPress={navigation.toggleDrawer}>
            <Image
              size={32}
              source={icons.user}
              style={{
                height: 40,
                width: 40,
                borderRadius: 50,
                marginLeft: 10,
              }}
            />
          </Pressable>
        ),
        drawerStyle: {
          backgroundColor: colors.bg,
          width: 250,
        },
        headerStyle: {
          backgroundColor: colors.bg,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerLabelStyle: {
          color: colors.white,
        },
      })}
      drawerContent={(props) => {
        return (
          <>
            <View
              style={{
                marginTop: 30,
                height: 200,
                width: "100%",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingLeft: 10,
                // borderBottomColor: colors.bg,
                // borderBottomWidth: 1,
              }}
            >
              <Image
                source={icons.user}
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 50,
                }}
              />
              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontFamily: "SemiBold",
                  color: colors.white,
                }}
              >
                Test user
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Medium",
                  color: colors.white,
                }}
              >
                Main Manager
              </Text>
            </View>
            <DrawerItemList {...props} />
          </>
        );
      }}
      // screenOptions={{
      //   drawerStyle: {
      //     backgroundColor: colors.bg,
      //     width: 250,
      //   },
      //   headerStyle: {
      //     backgroundColor: colors.bg,
      //   },
      //   headerTintColor: "#fff",
      //   headerTitleStyle: {
      //     fontWeight: "bold",
      //   },
      //   drawerLabelStyle: {
      //     color: colors.white,
      //   },
      // }}
    >
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: "Profile",
          title: "Profile",
          drawerIcon: () => (
            <SimpleLineIcons name="home" size={20} color={colors.white} />
          ),
        }}
        component={Profile}
      />

      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
          drawerIcon: () => (
            <MaterialIcons name="settings" size={20} color={colors.white} />
          ),
        }}
        component={Settings}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
