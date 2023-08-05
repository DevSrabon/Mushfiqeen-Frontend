import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import moment from "moment";
import React from "react";
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

const HomeCard = ({ post }) => {
  const { userData, setRefetch } = useAuth();
  const navigation = useNavigation();
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

  const timeAgo = (createdAt) => {
    const duration = moment.duration(moment().diff(moment(createdAt)));
    const seconds = duration.seconds();
    const minutes = duration.minutes();
    const hours = duration.hours();
    const days = duration.days();
    const years = duration.years();

    if (years > 0) {
      return `${years}y ago`;
    } else if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return `${seconds}s ago`;
    }
  };
  const date = timeAgo(post?.createdAt);
  const onNavigate = () => {};
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
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <SubTitle>
                {post?.user?.designation || "Sub title of user"}
              </SubTitle>
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
          <TextSmall>{date}</TextSmall>
          <View
            style={{
              borderColor: colors.white,
              borderWidth: 3,
              borderRadius: 25,
              alignSelf: "center",
            }}
          />

          <TextSmall style={{ color: colors.primary }}>
            {post?.commentsLength}
          </TextSmall>
          <TextSmall>Comments</TextSmall>

          {/* <TextSmall style={{ color: colors.primary }}>2</TextSmall>
          <TextSmall>Share</TextSmall> */}
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
