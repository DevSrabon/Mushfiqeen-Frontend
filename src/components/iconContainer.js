import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import NavStr from "../Nav/NavStr";
import colors from "../theme/Colors";
import useCreateChat from "./Chats/useCreateChat";
import TextSmall from "./textSmall";

const IconContainer = ({ onLikes, userData, post }) => {
  const navigation = useNavigation();

  const isLiked = useMemo(() => {
    return (
      post?.likers?.includes(userData?.data?._id) ||
      post?.likers?.some((item) => item?._id === userData?.data?._id)
    );
  }, [post?.likers, userData?.data?._id]);

  const onNavigate = useCallback(() => {
    navigation.navigate(NavStr.POSTDETAILS, { post });
  }, [navigation, post]);

  const onSendMessage = useCreateChat(post?.user);

  return (
    <View style={styles.container}>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          gap: 5,
        }}
        onPress={() => onLikes()}
      >
        <TextSmall style={{ color: colors.primary }}>{post?.likes}</TextSmall>
        <View style={{ alignItems: "center" }}>
          {isLiked ? (
            <AntDesign name={"like1"} size={18} color={colors.primary} />
          ) : (
            <AntDesign name={"like2"} size={18} color={colors.primaryLight} />
          )}
          <TextSmall>{isLiked ? "Liked" : "Like"}</TextSmall>
        </View>
      </Pressable>

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          gap: 5,
        }}
        onPress={onNavigate}
      >
        <TextSmall style={{ color: colors.primary }}>
          {post?.commentsLength}
        </TextSmall>
        <View style={{ alignItems: "center" }}>
          <FontAwesome5
            name="comment-dots"
            size={18}
            color={colors.primaryLight}
          />
          <TextSmall style={{ color: colors.primaryLight }}>Comment</TextSmall>
        </View>
      </Pressable>

      <Pressable style={{ alignItems: "center" }}>
        <FontAwesome5
          name="share-square"
          size={18}
          color={colors.primaryLight}
        />
        <TextSmall style={{ color: colors.primaryLight }}>Share</TextSmall>
      </Pressable>

      <Pressable style={{ alignItems: "center" }} onPress={onSendMessage}>
        <FontAwesome name="send" size={18} color={colors.primaryLight} />
        <TextSmall style={{ color: colors.primaryLight }}>Send</TextSmall>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 30,
  },
});

export default React.memo(IconContainer);
