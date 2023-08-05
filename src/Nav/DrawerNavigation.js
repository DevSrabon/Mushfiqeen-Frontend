import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Login, Settings, Signup } from "../screen";
import ProfileInfo from "../screen/ProfileInfo";
import CustomDrawer from "./components/CustomDrawer";
import BottomNavigator from "./BottomNavigation";
import NavStr from "./NavStr";
import { NavigationContainer } from "@react-navigation/native";
import UpdateProfile from "../screen/UpdateProfile";
import ForgetPass from "../screen/ForgetPass";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen name={NavStr.HOME} component={BottomNavigator} />
        <Drawer.Screen name={NavStr.PROFILE} component={ProfileInfo} />
        <Drawer.Screen name={NavStr.PROFILE_UPDATE} component={UpdateProfile} />
        <Drawer.Screen name={NavStr.SETTINGS} component={Settings} />
        <Drawer.Screen name={NavStr.LOGIN} component={Login} />
        <Drawer.Screen name={NavStr.SIGNUP} component={Signup} />
        <Drawer.Screen name={NavStr.FORGET} component={ForgetPass} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;
