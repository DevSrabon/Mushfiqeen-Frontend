import {
  AntDesign,
  FontAwesome,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import icons from "../../assets/icons";
import NavStr from "../Nav/NavStr";
import { Row, SubContainer, SubTitle, Title } from "../components";
import CustomBottom from "../components/customBottom";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";

const ProfilePage = () => {
  const router = useRoute();

  const params = router.params;
  const { userData, updateRefetch, profile, setProfile, setBayan } = useAuth();

  const navigation = useNavigation();
  const onUpdateNavigate = () => {
    navigation.navigate(NavStr.PROFILE_UPDATE);
  };

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
  }, [userData?.data?._id, paramsId, updateRefetch]);
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
            `https://musfiqeen-backend.vercel.app/api/v1/bayans/getById/${id}`
          );

          if (res.data.data) {
            setBayan(res.data.data);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchData();
    }
    return () => {
      setBayan(null);
    };
  }, [userData?.data?._id, paramsId]);

  return (
    <SubContainer>
      <Row style={{ marginTop: StatusBar.currentHeight }}>
        <AntDesign
          name="arrowleft"
          size={30}
          color={colors.white}
          onPress={() => navigation.navigate(NavStr.HOME)}
          // style={{ paddingHorizontal: 10 }}
        />
        {userData?.data?._id === profile?._id && (
          <TouchableOpacity onPress={() => onUpdateNavigate()}>
            <Title style={{ color: colors.primary }}>Update Profile</Title>
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
              }}
            />
          ) : (
            <Image
              source={icons.user}
              resizeMode="cover"
              style={{
                height: 150,
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
              <SubTitle>{profile?.followers?.length || "0"}</SubTitle>
              <SubTitle>Followers</SubTitle>
            </View>

            <View style={styles.infoDiv}>
              <SubTitle>{profile?.following?.length || "0"}</SubTitle>
              <SubTitle>Followings</SubTitle>
            </View>

            <View style={styles.infoDiv}>
              <SubTitle>{profile?.posts?.length || "0"}</SubTitle>
              <SubTitle>Posts</SubTitle>
            </View>
          </Row>
        </View>
      </>
      <CustomBottom />
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
