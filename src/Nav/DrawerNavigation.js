import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Settings } from "../screen";
import ProfileInfo from "../screen/ProfileInfo";
import CustomDrawer from "./components/CustomDrawer";
import BottomNavigator from "./BottomNavigation";
import NavStr from "./NavStr";
import UpdateProfile from "../screen/UpdateProfile";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
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
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
