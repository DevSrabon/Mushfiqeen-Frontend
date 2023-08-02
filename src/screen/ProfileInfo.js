import {
    View,
    Text,
    Image,
    TouchableOpacity,
    useWindowDimensions,
    FlatList,
    StyleSheet,
    ScrollView
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import icons from "../../assets/icons";
import { Container, SubTitle, Title } from "../components";
import colors from "../theme/Colors";
// import CustomButton from "../components/customButton";
import { useNavigation } from "@react-navigation/native";

const PostRoutes = () => (
    <View style={{ flex: 1 ,backgroundColor: colors.lightGray}}>
        <FlatList
            data={"Post"}
            // data={Post}
            numColumns={3}
            renderItem={({ item, index }) => (
                <View
                    style={{
                        flex: 1,
                        margin: 3,
                    }}
                >
                    <View
                        key={index}
                        source={item}
                        style={{ width: "100%", height: "100%", borderRadius: 12 }}
                    />
                </View>
            )}
        />
    </View>
);

const BayanRoutes = () => (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
        <FlatList
            data={"Bayan"}
            // data={Bayan}
            numColumns={3}
            renderItem={({ item, index }) => (
                <View
                    style={{
                        flex: 1,
                        // aspectRatio: 1,
                        margin: 3,
                        padding: 22,
                    }}
                >
                    <View
                        key={index}
                        source={item}
                        style={{ width: "100%", height: "100%", borderRadius: 12 }}
                    />
                </View>
            )}
        />
    </View>
);

const renderScene = SceneMap({
    first: PostRoutes,
    second: BayanRoutes,
});

const ProfileInfo = () => {
    const navigation = useNavigation();
    const onUpdateNavigate = () => {
        navigation.navigate("UpdateProfile");
    };

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    const [routes] = useState([
        { key: "first", title: "Posts" },
        { key: "second", title:"Bayan"  },
    ]);

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: colors.white,
            }}
            style={{
                backgroundColor: colors.lightBg,
                height: 44,
            }}
            renderLabel={({ focused, route }) => (
                <Text style={[{ color: focused ? colors.white : colors.lightGray }]}>
                    {route.title}
                </Text>
            )}
        />
    );

    return (
        <Container
            style={{
                flex: 1,
                backgroundColor: colors.bg,
            }}
        >
            <>
                <StatusBar backgroundColor={colors.lightGray} />
                <View style={{ width: "100%" }}>
                    <Image
                        source={icons.user}
                        resizeMode="cover"
                        style={{
                            height: 180,
                            width: "100%",
                        }}
                    />
                </View>

                <View style={{ flex: 1, alignItems: "center" }}>
                    <Image
                        source={icons.user}
                        resizeMode="contain"
                        style={{
                            height: 140,
                            width: 140,
                            borderRadius: 999,
                            borderColor: colors.lightGray,
                            borderWidth: 2,
                            marginTop: -90,
                        }}
                    />

                    <Title style={{
                        color: colors.white,
                        marginVertical: 8,
                        fontSize: 15,
                        fontFamily: "SemiBold"
                    }}>
                        Mahbub Morshed
                    </Title>
                    <SubTitle style={{ color: colors.lightGray }}>
                        3D Designer
                    </SubTitle>

                    <View
                        style={{
                            flexDirection: "row",
                            marginVertical: 6,
                            alignItems: "center",
                        }}
                    >
                        <MaterialIcons name="location-on" size={24} color={colors.lightGray} />
                        <Text style={{ marginLeft: 4, color: colors.lightGray }}>
                            Dhaka, Bangladesh
                        </Text>
                    </View>

                    <View style={{
                        paddingVertical: 8,
                        flexDirection: "row",
                    }}>
                        <View style={{
                            flexDirection: "column",
                            alignItems: "center",
                            marginHorizontal: 20,
                        }}>
                            <Text style={{ color: colors.white }}>
                                122
                            </Text>
                            <Text style={{ color: colors.white }}>
                                Followers
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                marginHorizontal: 20,
                            }}
                        >
                            <Text style={{ color: colors.white }}>
                                67
                            </Text>
                            <Text style={{ color: colors.white }}>
                                Followings
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                marginHorizontal: 22,
                            }}>
                            <Text style={{ color: colors.white }}>
                                7K
                            </Text>
                            <Text style={{ color: colors.white }}>
                                Posts
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity

                            style={{
                                width: 124,
                                height: 36,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: colors.lightBg,
                                borderRadius: 10,
                                marginHorizontal: 20 * 2,
                            }}
                            onPress={() => onUpdateNavigate()}
                        >
                            <Text style={{ color: colors.white }}>
                                Update Profile
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                width: 124,
                                height: 36,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: colors.lightBg,
                                borderRadius: 10,
                                marginHorizontal: 20 * 2,
                            }}
                        >
                            <Text style={{ color: colors.white }}>
                                Add Friend
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 1, marginHorizontal: 12, marginTop: 190 }}>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}
                        renderTabBar={renderTabBar}
                    />
                </View>
            </>
        </Container>
    )
}

export default ProfileInfo

const styles = StyleSheet.create({

})