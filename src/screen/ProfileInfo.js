import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import icons from "../../assets/icons";
import { Container, SubRow, SubTitle, Title } from "../components";
import colors from "../theme/Colors";
// import CustomButton from "../components/customButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../contexts/useAuth";
const ProfileInfo = () => {
  const [profile, setProfile] = useState({});
  const router = useRoute();

  const params = router.params;

  const paramsId = params?.id;

  const PostRoutes = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.lightGray,
        paddingHorizontal: 10,
      }}
    >
      <FlatList
        data={profile?.posts}
        // data={Post}
        // numColumns={2}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              marginBottom: 20,
            }}
          >
            <View
              key={index}
              source={profile?.fullName}
              style={{ width: "100%", height: "100%", borderRadius: 12 }}
            />
            <SubRow>
              {profile?.imageURL && (
                <Image
                  source={{ uri: profile?.imageURL }}
                  resizeMode="cover"
                  style={styles.userImg}
                />
              )}
              <View>
                <Title>{profile?.fullName}</Title>
                <View
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <SubTitle>
                    {profile?.designation || "Sub title of user"}
                  </SubTitle>
                </View>
              </View>
            </SubRow>

            <SubTitle>{item?.description}</SubTitle>
            <SubRow>
              <SubTitle>Likes: {item?.likes}</SubTitle>
              <SubTitle>Comments: {item?.commentsLength}</SubTitle>
            </SubRow>
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

  const navigation = useNavigation();
  const onUpdateNavigate = () => {
    navigation.navigate("UpdateProfile");
  };
  const { userData } = useAuth();

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "first", title: "Posts" },
    { key: "second", title: "Bayan" },
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
  let id = userData?.data?._id;
  if (paramsId) {
    id = paramsId;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://musfiqeen-backend.vercel.app/api/v1/users/getUser/${id}`
        );

        if (res.data.data) {
          setProfile(res.data.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
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
          {userData?.data ? (
            <Image
              source={{ uri: profile?.imageURL }}
              resizeMode="cover"
              style={{
                height: 180,
                width: "100%",
              }}
            />
          ) : (
            <Image
              source={icons.user}
              resizeMode="cover"
              style={{
                height: 180,
                width: "100%",
              }}
            />
          )}
        </View>

        <View style={{ flex: 1, alignItems: "center" }}>
          {profile ? (
            <Image
              source={{ uri: profile?.imageURL }}
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
          ) : (
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
          )}

          <Title
            style={{
              color: colors.white,
              marginVertical: 8,
              fontSize: 15,
              fontFamily: "SemiBold",
            }}
          >
            {profile?.fullName}
          </Title>
          <SubTitle style={{ color: colors.lightGray }}>
            {profile?.designation}
          </SubTitle>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="location-on"
              size={24}
              color={colors.lightGray}
            />
            <Text style={{ marginLeft: 4, color: colors.lightGray }}>
              {profile?.address || "Dhaka, Bangladesh"}
            </Text>
          </View>

          <View
            style={{
              paddingVertical: 8,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginHorizontal: 20,
              }}
            >
              <Text style={{ color: colors.white }}>
                {profile?.followers?.length + 1 || "0"}
              </Text>
              <Text style={{ color: colors.white }}>Followers</Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginHorizontal: 20,
              }}
            >
              <Text style={{ color: colors.white }}>
                {profile?.following?.length + 1 || "0"}
              </Text>
              <Text style={{ color: colors.white }}>Followings</Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginHorizontal: 22,
              }}
            >
              <Text style={{ color: colors.white }}>
                {profile?.posts?.length + 1 || "0"}
              </Text>
              <Text style={{ color: colors.white }}>Posts</Text>
            </View>
          </View>
          {userData?.data?._id === profile?._id && (
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
                <Text style={{ color: colors.white }}>Update Profile</Text>
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
                <Text style={{ color: colors.white }}>Add Friend</Text>
              </TouchableOpacity>
            </View>
          )}
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
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    width: "100%",
    // height: 400,
    marginBottom: 10,
    // marginTop: 10,
  },
  userImg: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignSelf: "center",
  },
  icon: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 25,
    padding: 3,
  },
});
