import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import moment from "moment";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import icons from "../../assets/icons";
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

const HomeCard = ({ post }) => {
  const { userData, setRefetch } = useAuth();

  const onLikes = async () => {
    try {
      const res = await axios.put(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/likes/${post?._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData?.accessToken}`,
          },
        }
      );

      setRefetch(true);
      console.log("Like updated successfully");
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else if (error.response.data.error) {
        alert(error.response.data.error);
      }
    } finally {
      setRefetch(false);
    }
  };

  const onFollow = async () => {
    try {
      await axios.post(
        `https://musfiqeen-backend.vercel.app/api/v1/users/add-follow/${post?.user?._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData?.accessToken}`,
          },
        }
      );

      setRefetch(true);
      console.log("Like updated successfully");
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else if (error.response.data.error) {
        alert(error.response.data.error);
      }
    } finally {
      setRefetch(false);
    }
  };
  const isFollowing = post?.user?.followers?.includes(userData?.data?._id);

  return (
    <View style={styles.container}>
      <Row>
        <SubRow>
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
          <View>
            <Title>{post?.user?.fullName}</Title>
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <SubTitle>
                {post?.user?.designation || "Sub title of user"}
              </SubTitle>
              <TextSmall>{moment(post?.createdAt).fromNow()}</TextSmall>
            </View>
          </View>
        </SubRow>
        {isFollowing ? (
          <SubRow>
            <AntDesign name="Safety" size={16} color={colors.primary} />
            <Title style={{ color: colors.primary }}>Followed</Title>
          </SubRow>
        ) : (
          <Pressable onPress={onFollow}>
            <SubRow>
              <AntDesign name="plussquareo" size={16} color={colors.primary} />
              <Title style={{ color: colors.primary }}>Follow</Title>
            </SubRow>
          </Pressable>
        )}
      </Row>
      <View
        style={{
          height: "auto",
          marginVertical: 5,
          marginHorizontal: 10,
        }}
      >
        <SubTitle>{post?.description}</SubTitle>
      </View>
      <Row>
        <SubRow>
          <AntDesign
            name="like1"
            size={12}
            color={colors.primary}
            style={styles.icon}
          />
          <TextSmall>{post?.likes}</TextSmall>
        </SubRow>
        <SubRow style={{ gap: 3 }}>
          <TextSmall style={{ color: colors.primary }}>
            {post?.commentsLength}
          </TextSmall>
          <TextSmall>Comments</TextSmall>
          <View
            style={{
              borderColor: colors.white,
              borderWidth: 3,
              borderRadius: 25,
              alignSelf: "center",
            }}
          />
          <TextSmall style={{ color: colors.primary }}>2</TextSmall>
          <TextSmall>Share</TextSmall>
        </SubRow>
      </Row>

      <HorizantalBar />
      <IconContainer onLikes={onLikes} userData={userData} post={post} />
    </View>
  );
};

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

export default HomeCard;
