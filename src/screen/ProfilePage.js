import { FontAwesome, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import icons from "../../assets/icons";
import NavStr from "../Nav/NavStr";
import {
  HorizantalBar,
  Row,
  SubContainer,
  SubRow,
  SubTitle,
  TextSmall,
  Title,
} from "../components";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const router = useRoute();

  const params = router.params;

  const PostRoutes = () => {
    const { setPostId } = useAuth();
    const navigation = useNavigation();
    const onNavigate = (item) => {
      setPostId(item);
      navigation.navigate(NavStr.POSTDETAILS);
    };
    const renderPostItem = ({ item, index }) => (
      <Pressable onPress={() => onNavigate(item)} key={index}>
        <View
          style={{
            paddingHorizontal: 10,
            // paddingVertical: 10,
          }}
        >
          <SubTitle style={{ paddingVertical: 5, paddingLeft: 10 }}>
            {item?.description}
          </SubTitle>

          <SubRow
            style={{
              gap: 3,
              alignSelf: "flex-end",
              paddingVertical: 5,
              paddingRight: 10,
            }}
          >
            <TextSmall style={{ color: colors.primary }}>
              {item?.likes}
            </TextSmall>
            <TextSmall>Likes</TextSmall>

            <SubTitle>||</SubTitle>

            <TextSmall style={{ color: colors.primary }}>
              {item?.commentsLength}
            </TextSmall>
            <TextSmall>Comments</TextSmall>
          </SubRow>
          <HorizantalBar />
        </View>
      </Pressable>
    );

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bg,
          // paddingHorizontal: 10,
          width: "100%",
          height: "auto",
        }}
      >
        {profile?.posts?.map((item, index) => renderPostItem({ item, index }))}
      </View>
    );
  };

  const BayanRoutes = () => {
    const bayanData = [
      { key: 1, image: "image_url_1" },
      { key: 2, image: "image_url_2" },
      { key: 3, image: "image_url_3" },
      // Add more data items as needed
    ];

    const renderBayanItem = ({ item, index }) => (
      <View
        key={index}
        style={{
          flex: 1,
          // aspectRatio: 1,
          margin: 3,
          padding: 22,
        }}
      >
        <View
          source={item.image}
          style={{ width: "100%", height: "100%", borderRadius: 12 }}
        />
      </View>
    );

    return (
      <View style={{ flex: 1, backgroundColor: colors.primary }}>
        {bayanData.map((item, index) => renderBayanItem({ item, index }))}
      </View>
    );
  };

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
    return () => {
      setProfile(null);
    };
  }, [userData?.data?._id, paramsId]);

  return (
    <SubContainer>
      <Row>
        <AntDesign
          name="arrowleft"
          size={30}
          color={colors.white}
          onPress={() => navigation.navigate(NavStr.HOME)}
          // style={{ paddingHorizontal: 10 }}
        />
        {userData?.data?._id === profile?._id && (
          <TouchableOpacity
            style={{
              alignSelf: "center",
            }}
            onPress={() => onUpdateNavigate()}
          >
            <Title style={{ color: colors.primary, alignSelf: "center" }}>
              Update Profile
            </Title>
          </TouchableOpacity>
        )}
      </Row>

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
            scrollEnabled={true}
          />
        </View>
      </>
    </SubContainer>
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
