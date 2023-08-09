import React, { useCallback } from "react";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";

import { Image, Pressable, StyleSheet, View } from "react-native";
import icons from "../../assets/icons";
import NavStr from "../Nav/NavStr";
import {
  HorizantalBar,
  IconContainer,
  Row,
  SubRow,
  SubTitle,
  TextSmall,
  Title,
} from "../components";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";
import TimeAgo from "./timeAgo";

const HomeCard = ({ post }) => {
  const { userData, setRefetch } = useAuth();

  const navigation = useNavigation();

  const onLikes = useCallback(async () => {
    try {
      setRefetch((prev) => !prev);
      const res = await axios.put(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/likes/${post?._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData?.accessToken}`,
          },
        }
      );
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else if (error.response.data.error) {
        alert(error.response.data.error);
      }
    } finally {
    }
  }, [post?._id, setRefetch, userData?.accessToken]);

  const onFollow = useCallback(async () => {
    try {
      setRefetch((prev) => !prev);
      await axios.post(
        `https://musfiqeen-backend.vercel.app/api/v1/users/add-follow/${post?.user?._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData?.accessToken}`,
          },
        }
      );
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else if (error.response.data.error) {
        alert(error.response.data.error);
      }
    } finally {
      setRefetch(false);
    }
  }, [post?._id, setRefetch, userData?.accessToken]);
  const isFollowing = post?.user?.followers?.includes(userData?.data?._id);

  // const date = timeAgo(post?.createdAt);

  return (
    <View style={styles.container}>
      <Row>
        <SubRow>
          <Pressable
            onPress={() => {
              navigation.navigate(NavStr.PROFILE, { id: post?.user?._id });
            }}
          >
            {post?.user?.imageURL ? (
              <Image
                source={{ uri: post?.user?.imageURL }}
                resizeMode="cover"
                style={styles.userImg}
              />
            ) : (
              <Image
                source={icons.user}
                resizeMode="cover"
                style={styles.userImg}
              />
            )}
          </Pressable>
          <View>
            <Title>{post?.user?.fullName}</Title>
            <SubTitle>
              {post?.user?.designation || "Sub title of user"}
            </SubTitle>
          </View>
        </SubRow>
        <View style={styles.threeDots}>
          {/* <Entypo name="dots-three-horizontal" size={18} color={colors.white} /> */}
          {/* <Entypo name="dots-three-vertical" size={20} color={colors.primary} /> */}
          <MaterialCommunityIcons
            name="dots-vertical"
            size={20}
            color={colors.primary}
          />
        </View>
      </Row>
      <View
        style={{
          height: "auto",
          marginVertical: 5,
          marginHorizontal: 10,
        }}
      >
        <SubTitle style={{ fontFamily: "Regular", fontSize: 14 }}>
          {post?.description}
        </SubTitle>
      </View>
      <Row>
        <SubRow>
          {isFollowing ? (
            <SubRow style={{ gap: 0 }}>
              <AntDesign name="Safety" size={16} color={colors.primary} />
              <Title style={{ color: colors.primary }}>Followed</Title>
            </SubRow>
          ) : (
            <Pressable onPress={onFollow}>
              <SubRow style={{ gap: 0 }}>
                <AntDesign
                  name="plussquareo"
                  size={16}
                  color={colors.primary}
                />
                <Title style={{ color: colors.primary }}>Follow</Title>
              </SubRow>
            </Pressable>
          )}

          {/* <TextSmall>{post?.likes}</TextSmall> */}
        </SubRow>
        <SubRow style={{ gap: 3 }}>
          <TimeAgo createdAt={post?.createdAt} />
          <SubTitle>||</SubTitle>

          <TextSmall style={{ color: colors.primary }}>
            {post?.commentsLength}
          </TextSmall>
          <TextSmall>Comments</TextSmall>
        </SubRow>
      </Row>

      <HorizantalBar />
      <IconContainer onLikes={onLikes} userData={userData} post={post} />
    </View>
  );
};

const styles = StyleSheet.create({
  threeDots: {
    // alignItems: "center",
    // justifyContent: "center",
    // height: 30,
    // width: 30,
    // borderRadius: 50,
    // borderColor: colors.primary,
    // borderWidth: 0.5,
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

export default React.memo(HomeCard);
