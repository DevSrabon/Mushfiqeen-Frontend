import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import React, { useCallback, useState } from "react";

import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import icons from "../../assets/icons";
import NavStr from "../Nav/NavStr";
import {
  HorizantalBar,
  IconContainer,
  Row,
  SubRow,
  SubTitle,
  Title,
} from "../components";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";
import TextSmall from "./textSmall";
import TimeAgo from "./timeAgo";

const HomeCard = ({ post }) => {
  const { userData, setRefetch } = useAuth();
  const [seeMore, setSeeMore] = useState(false);
  const [showLess, setShowLess] = useState(false);
  const navigation = useNavigation();
  const [isHidden, setIsHidden] = useState(false);
  let description;
  if (post.description?.length < 500) {
    description = post.description;
  } else if (post.description?.length >= 500) {
    description = post.description.slice(0, 500);
  }
  const headers = {
    Authorization: `Bearer ${userData?.accessToken}`,
  };
  const onLikes = useCallback(async () => {
    try {
      setRefetch((prev) => !prev);
      const res = await axios.put(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/likes/${post?._id}`,
        {},
        { headers }
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
        { headers }
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

  const onEdit = useCallback(
    async (post) => {
      setIsHidden((prev) => !prev);
      navigation.navigate(NavStr.POST, (state = { post }));
    },
    [post]
  );

  const handelToggle = () => {
    setIsHidden((prev) => !prev);
  };

  const onDelete = useCallback(
    async (id) => {
      try {
        const res = await axios.delete(
          `https://musfiqeen-backend.vercel.app/api/v1/posts/delete/${id}`,
          { headers }
        );
        setIsHidden((prev) => !prev);
        setRefetch((prev) => !prev);
      } catch (error) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        } else if (error.response.data.error) {
          alert(error.response.data.error);
        }
      }
    },
    [setRefetch]
  );

  return (
    <View style={styles.container}>
      <Row key={`row-${post._id}`}>
        <SubRow key={`subrow-${post._id}`}>
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
        {post?.user?._id === userData?.data?._id ? (
          <View style={styles.threeDots}>
            {isHidden && (
              <View style={styles.options}>
                <TouchableOpacity onPress={() => onEdit(post)}>
                  <TextSmall style={{ fontSize: 13 }}>Edit</TextSmall>
                </TouchableOpacity>
                <HorizantalBar />
                <TouchableOpacity onPress={() => onDelete(post?._id)}>
                  <TextSmall style={{ fontSize: 13 }}>Delete</TextSmall>
                </TouchableOpacity>
              </View>
            )}
            {/* Three dot icons */}
            <TouchableOpacity onPress={handelToggle}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={20}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        ) : (
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
            </SubRow>
          </Row>
        )}
      </Row>
      <View
        style={{
          height: "auto",
          marginVertical: 5,
          marginHorizontal: 10,
        }}
      >
        {post?.description?.length >= 500 && !seeMore && !showLess && (
          <>
            <Title style={{ textAlign: "justify" }}>{description}</Title>

            <Pressable onPress={(prev) => setSeeMore(!seeMore)}>
              <Title style={{ textAlign: "right", color: colors.primaryLight }}>
                ...See More
              </Title>
            </Pressable>
          </>
        )}
        {post?.description?.length > 500 && seeMore && !showLess && (
          <Title style={{ textAlign: "justify", fontSize: 14 }}>
            {post?.description}
            <Pressable
              onPress={(prev) => {
                setShowLess(!prev), setSeeMore(!prev);
              }}
            >
              <Title style={{ textAlign: "right", color: colors.primaryLight }}>
                ...Show Less
              </Title>
            </Pressable>
          </Title>
        )}
        {post?.description?.length < 500 && (
          <SubTitle style={{ textAlign: "justify", fontSize: 14 }}>
            {post?.description}
          </SubTitle>
        )}
      </View>
      <Row>
        <SubRow>
          <TimeAgo createdAt={post?.createdAt} />
        </SubRow>
      </Row>
      <HorizantalBar />
      <IconContainer onLikes={onLikes} userData={userData} post={post} />
    </View>
  );
};

const styles = StyleSheet.create({
  threeDots: {
    flexDirection: "row",
    position: "relative",
  },
  container: {
    backgroundColor: colors.bg,
    width: "100%",

    marginBottom: 10,
  },
  options: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: colors.bg,
    borderColor: colors.lightGray,
    gap: 2,
    position: "absolute",
    right: 18,
    top: 0,
    shadowColor: colors.secondary,
    shadowRadius: 15,
    shadowOffset: 10,
    elevation: 10,
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
