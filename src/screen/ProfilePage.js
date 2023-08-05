import { FontAwesome, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
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
import NavStr from "../Nav/NavStr";
import { Container, Row, SubRow, SubTitle, Title } from "../components";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const router = useRoute();

  const params = router.params;

  const PostRoutes = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.lightGray,
        paddingHorizontal: 10,
        width: "100%",
        // height: "100%",
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
              marginTop: 10,
              borderWidth: 1,
              borderColor: colors.bg,
              padding: 10,
            }}
          >
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
    navigation.navigate(NavStr.PROFILE_UPDATE);
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
  const paramsId = params?.id ?? null;
  useEffect(() => {
    let id = userData?.data?._id;

    if (paramsId) {
      id = paramsId;
    } else {
      id = userData?.data?._id;
    }

    if (id !== null) {
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
    }
  }, [userData?.data?._id, paramsId]);

  return (
    <Container
      style={{
        flex: 1,
        backgroundColor: colors.bg,
      }}
    >
      <StatusBar backgroundColor={colors.lightGray} />
      <>
        <View style={{ width: "100%" }}>
          {userData?.data ? (
            <Image
              source={{ uri: profile?.imageURL }}
              resizeMode="cover"
              style={{
                height: 150,
                width: "100%",
              }}
            />
          ) : (
            <Image
              source={icons.user}
              resizeMode="cover"
              style={{
                height: 150,
                width: "100%",
              }}
            />
          )}
        </View>

        <View style={{ alignItems: "center" }}>
          {profile ? (
            <Image
              source={{ uri: profile?.imageURL }}
              resizeMode="contain"
              style={styles.profileImg}
            />
          ) : (
            <Image
              source={icons.user}
              resizeMode="contain"
              style={styles.profileImg}
            />
          )}
          {userData?.data?._id === profile?._id && (
            <TouchableOpacity
              style={{
                width: 120,
                height: 35,
                alignSelf: "flex-end",
                justifyContent: "center",
                backgroundColor: colors.lightBg,
                borderRadius: 20,
                // marginHorizontal: 20 * 2,
                marginTop: 5,
              }}
              onPress={() => onUpdateNavigate()}
            >
              <Text style={{ color: colors.white, alignSelf: "center" }}>
                Update Profile
              </Text>
            </TouchableOpacity>
          )}

          <Title>{profile?.fullName}</Title>
          <SubTitle style={{ color: colors.lightGray }}>
            {profile?.designation}
          </SubTitle>

          <Row>
            <MaterialIcons
              name="location-on"
              size={24}
              color={colors.lightGray}
            />
            <Text style={{ marginLeft: 4, color: colors.lightGray }}>
              {profile?.address || "Dhaka, Bangladesh"}
            </Text>
          </Row>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
              // alignItems: "center",
            }}
          >
            <Fontisto name="mobile" size={20} color={colors.lightGray} />
            <Text
              style={{
                marginLeft: 8,
                marginRight: 22,
                color: colors.lightGray,
              }}
            >
              {profile?.contactNumber}
            </Text>
            <FontAwesome
              name="birthday-cake"
              size={17}
              color={colors.lightGray}
            />
            <Text style={{ marginLeft: 8, color: colors.lightGray }}>
              {new Date(profile?.dateOfBirth).toDateString()}
            </Text>
            <View></View>
          </View>

          <Row>
            <View style={styles.infoDiv}>
              <SubTitle>{profile?.followers?.length + 1 || "0"}</SubTitle>
              <SubTitle>Followers</SubTitle>
            </View>

            <View style={styles.infoDiv}>
              <SubTitle>{profile?.following?.length + 1 || "0"}</SubTitle>
              <SubTitle>Followings</SubTitle>
            </View>

            <View style={styles.infoDiv}>
              <SubTitle>{profile?.posts?.length + 1 || "0"}</SubTitle>
              <SubTitle>Posts</SubTitle>
            </View>
          </Row>
        </View>

        <View style={{ flex: 1 }}>
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

export default ProfilePage;

const styles = StyleSheet.create({
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 999,
    borderColor: colors.lightGray,
    borderWidth: 3,
    marginTop: -53,
  },
  infoDiv: {
    alignItems: "center",
    marginHorizontal: 20,
  },
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

// import React from "react";
// import {
//   ScrollView
// } from "react-native";

// import ProfilePage from "./ProfilePage";
// // import { ScrollView } from "react-native-gesture-handler";

// const ProfileInfo = () => {
//   return (
//     <ScrollView>
//       <ProfilePage />
//     </ScrollView>
//   );
// };

// export default ProfileInfo;
