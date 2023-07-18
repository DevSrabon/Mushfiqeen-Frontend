import "react-native-gesture-handler";
import { View, Text, Image } from "react-native";
import {
    SimpleLineIcons,
    MaterialIcons,
    MaterialCommunityIcons,
    FontAwesome
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";

import User from "./assets/user.jpeg";

import Backups from "./screens/Backups";
import Categories from "./screens/Categories";
import Contact from "./screens/Contact";
import Customize from "./screens/Customize";
import GetPremium from "./screens/GetPremium";
import Home from "./screens/Home";
import RateApp from "./screens/RateApp";
import Settings from "./screens/Settings";
import Timer from "./screens/Timer";

const Drawer = createDrawerNavigator();

export default function Drawer() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={
                    (props) => {
                        return (
                            <SafeAreaView>
                                <View
                                    style={{
                                        height: 200,
                                        width: '100%',
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderBottomColor: "#f4f4f4",
                                        borderBottomWidth: 1
                                    }}
                                >
                                    <Image
                                        source={User}
                                        style={{
                                            height: 130,
                                            width: 130,
                                            borderRadius: 65
                                        }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 22,
                                            marginVertical: 6,
                                            fontWeight: "bold",
                                            color: "#111"
                                        }}
                                    >Test user</Text>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: "#111"
                                        }}
                                    >Main Manager</Text>
                                </View>
                                <DrawerItemList {...props} />
                            </SafeAreaView>
                        )
                    }
                }
                screenOptions={{
                    drawerStyle: {
                        backgroundColor: "#fff",
                        width: 250
                    },
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    },
                    drawerLabelStyle: {
                        color: "#111"
                    }
                }}
            >
                <Drawer.Screen
                    name="Home"
                    options={{
                        drawerLabel: "Home",
                        title: "Home",
                        drawerIcon: () => (
                            <SimpleLineIcons name="home" size={20} color="#808080" />
                        )
                    }}
                    component={Home}
                />
                <Drawer.Screen
                    name="Timer"
                    options={{
                        drawerLabel: "Timer",
                        title: "Timer",
                        drawerIcon: () => (
                            <MaterialIcons name="timer" size={20} color="#808080" />
                        )
                    }}
                    component={Timer}
                />
                <Drawer.Screen
                    name="Categories"
                    options={{
                        drawerLabel: "Categories",
                        title: "Categories",
                        drawerIcon: () => (
                            <MaterialIcons name="category" size={20} color="#808080" />
                        )
                    }}
                    component={Categories}
                />
                <Drawer.Screen
                    name="Customize"
                    options={{
                        drawerLabel: "Customize",
                        title: "Customize",
                        drawerIcon: () => (
                            <MaterialIcons name="dashboard-customize" size={20} color="#808080" />
                        )
                    }}
                    component={Customize}
                />
                <Drawer.Screen
                    name="Settings"
                    options={{
                        drawerLabel: "Settings",
                        title: "Settings",
                        drawerIcon: () => (
                            <SimpleLineIcons name="settings" size={20} color="#808080" />
                        )
                    }}
                    component={Settings}
                />

                <Drawer.Screen
                    name="Backups"
                    options={{
                        drawerLabel: "Backups",
                        title: "Backups",
                        drawerIcon: () => (
                            <MaterialIcons name="backup" size={20} color="#808080" />
                        )
                    }}
                    component={Backups}
                />

                <Drawer.Screen
                    name="Get Premium"
                    options={{
                        drawerLabel: "Get Premuim",
                        title: "Get Premium",
                        drawerIcon: () => (
                            <MaterialCommunityIcons name="certificate" size={20} color="#808080" />
                        )
                    }}
                    component={GetPremium}
                />
                <Drawer.Screen
                    name="Rate this App"
                    options={{
                        drawerLabel: "Rate this App",
                        title: "Rate this App",
                        drawerIcon: () => (
                            <FontAwesome name="star" size={20} color="#808080" />
                        )
                    }}
                    component={RateApp}
                />

                <Drawer.Screen
                    name="Contact"
                    options={{
                        drawerLabel: "Contact",
                        title: "Contact",
                        drawerIcon: () => (
                            <MaterialCommunityIcons name="message-alert-outline" size={20} color="#808080" />
                        )
                    }}
                    component={Contact}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
