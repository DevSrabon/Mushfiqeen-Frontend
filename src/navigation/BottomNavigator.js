import { Text, Platform, View } from 'react-native';
import { Post, Chat, Bowan } from "./screens";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
    FontAwesome,
    Ionicons,
    AntDesign,
    Feather,
    Entypo,
    MaterialIcons
} from '@expo/vector-icons';
import { Home } from '../screen';

import colors from '../theme/Colors';




const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        background: "#fff"
    }
}
export default function BottomNavigator() {
    return (
        <>
            <Tab.Navigator
                backBehavior="Main"
                initialRouteName="Main"
                screenOptions={screenOptions}>
                <Tab.Screen
                    name="home"
                    component={Home}
                    options={{
                        title: "Home",
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Entypo name="home" size={24} color={focused ?`${colors.bg}` : "#111"} />
                                    <Text>HOME</Text>
                                </View>
                            )
                        }
                    }}
                />
                <Tab.Screen
                    name="Post"
                    component={Post}
                    options={{
                        title: "Post",
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <MaterialIcons name="post-add" size={24} color={focused ?`${colors.bg}` : "#111"} />
                                    <Text style={{ fonSize: 12, color: "#16247d" }}>Post</Text>
                                </View>
                            )
                        }
                    }}
                />
                <Tab.Screen
                    name="Bowan"
                    component={Bowan}
                    options={{
                        title: "Bowan",
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
                                            borderRadius: Platform.OS == "ios" ? 25 : 30
                                        }}
                                    >

                                        <Entypo name="sound" size={24} color="#fff" />
                                    </View>

                                </View>
                            )
                        }
                    }}
                />
                <Tab.Screen
                    name="Chat"
                    component={Chat}
                    options={{
                        title: "Chat",
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <MaterialIcons name="chat" size={24} color={focused ?`${colors.bg}` : "#111"} />
                                    <Text style={{ fonSize: 12, color: "#16247d" }}>Chat</Text>
                                </View>
                            )
                        }
                    }}
                />
                
            </Tab.Navigator>
        </>
    )
}
