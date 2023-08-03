import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import icons from "../../assets/icons";
import { useAuth } from "../contexts/useAuth";
// import { Profile, Settings } from "../screen";
import { Settings } from "../screen";
import Profile from "../screen/Profile";
import ProfileInfo from "../screen/ProfileInfo";
import colors from "../theme/Colors";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const { setToken, setUserData, setLoading, userData } = useAuth();
  const navigation = useNavigation();

  const onLogOut = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem("token");
      setToken(null);
      setUserData(null);
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
      navigation.navigate("login");
    }
  };

  const onSignIn = () => {
    navigation.navigate("login");
  };

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Pressable onPress={navigation.toggleDrawer}>
            {!userData?.data?.imageURL ? (
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
            ) : (
              <Image
                size={32}
                source={{ uri: userData?.data?.imageURL }}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 50,
                  marginLeft: 10,
                }}
              />
            )}
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
      drawerContent={(props) => (
        <>
          <View
            style={{
              marginTop: 30,
              height: 200,
              width: "100%",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingLeft: 10,
            }}
          >
            <Image
              source={{ uri: userData?.data?.imageURL } || icons.user}
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
              {userData?.data?.fullName || "Test user"}
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
          {userData?.data ? (
            <Pressable onPress={onLogOut}>
              <Text
                style={{ textAlign: "center", marginTop: 10, color: "white" }}
              >
                Log Out
              </Text>
            </Pressable>
          ) : (
            <Pressable onPress={onSignIn}>
              <Text
                style={{ textAlign: "center", marginTop: 10, color: "white" }}
              >
                Sign In
              </Text>
            </Pressable>
          )}
        </>
      )}
    >
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: "Home",
          title: "Home",
          drawerIcon: () => (
            <SimpleLineIcons name="home" size={20} color={colors.white} />
          ),
        }}
        component={Profile}
      />
      <Drawer.Screen
        name="profile"
        options={{
          headerShown: false,
          drawerLabel: "Profile",
          title: "Profile",
          drawerIcon: () => (
            <SimpleLineIcons name="user" size={20} color={colors.white} />
          ),
        }}
        component={ProfileInfo}
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
