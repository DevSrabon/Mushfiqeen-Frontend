import "react-native-gesture-handler";
import { View, Text } from "react-native";
import { SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import colors from "../theme/Colors";
import { Home, Profile, Settings } from "../screen";

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName={"Home"}
      drawerContent={(props) => {
        return (
          <>
            <View
              style={{
                height: 200,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: colors.bg,
                borderBottomWidth: 1,
                borderColor: colors.white,
              }}
            >
              {/* <Image
                source={User}
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 65,
                }}
              /> */}
              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontWeight: "bold",
                  color: "#111",
                }}
              >
                Test user
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#111",
                }}
              >
                Main Manager
              </Text>
            </View>
            <DrawerItemList {...props} />
          </>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
          width: 250,
        },
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerLabelStyle: {
          color: "#111",
        },
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          headerShown: true,
          drawerLabel: "",
        }}
        component={Home}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: "Profile",
          title: "Profile",
          drawerIcon: () => (
            <SimpleLineIcons name="home" size={20} color="#808080" />
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
            <MaterialIcons name="settings" size={20} color="#808080" />
          ),
        }}
        component={Settings}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
