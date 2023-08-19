import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NavStr from "../Nav/NavStr";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";
import Input from "./TextInput";
import HorizantalBar from "./horizontalBar";
import NormalText from "./normalText";
import Replies from "./reply";
import Row from "./row";
import SubTitle from "./subTitle";
import TextSmall from "./textSmall";
import TimeAgo from "./timeAgo";

const Comments = ({ comment, postId, config, setRefetch }) => {
  const [commentVisible, setCommentVisible] = useState(false);
  const [Visible, setVisible] = useState(false);
  const [commentEdit, setCommentEdit] = useState(false);
  const [value, setValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { userData } = useAuth();
  const isLiked = comment?.likes?.includes(userData?.data?._id);
  const navigation = useNavigation();

  const onCommentsLikes = useCallback(async () => {
    setRefetch((prev) => !prev);
    setLoading((prev) => !prev);
    try {
      await axios.put(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/${postId}/comments/${comment?._id}/like`,
        {},
        config
      );
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else if (error.response.data.error) {
        alert(error.response.data.error);
      }
    } finally {
      setRefetch((prev) => !prev);
      setLoading((prev) => !prev);
    }
  }, [postId, comment?._id, config]);

  const onCommentsEdit = useCallback(async () => {
    try {
      setRefetch((prev) => !prev);
      setLoading((prev) => !prev);
      await axios.put(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/update-comment/${postId}/${comment?._id}`,
        { comment: editValue },
        config
      );
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else if (error.response.data.error) {
        alert(error.response.data.error);
      }
    } finally {
      setEditValue("");
      setCommentEdit((prev) => !prev);
      setRefetch((prev) => !prev);
      setLoading((prev) => !prev);
    }
  }, [postId, comment?._id, config, editValue]);

  const onReply = useCallback(async () => {
    setRefetch((prev) => !prev);
    setLoading((prev) => !prev);

    try {
      const rest = await axios.put(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/reply/${postId}`,
        { replyText: value, commentId: comment?._id },
        config
      );

      setCommentVisible((prev) => !prev);
      setValue("");
    } catch (error) {
      console.log(error);
    } finally {
      setRefetch((prev) => !prev);
      setLoading((prev) => !prev);
    }
  }, [postId, value, config, comment?._id]);

  const onCommentDelete = async () => {
    setRefetch((prev) => !prev);
    setLoading((prev) => !prev);
    try {
      await axios.delete(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/delete-comment/${postId}/${comment?._id}`,
        {},
        config
      );
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else if (error.response.data.error) {
        alert(error.response.data.error);
      }
    } finally {
      setRefetch((prev) => !prev);
      setLoading((prev) => !prev);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", gap: 5, padding: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NavStr.PROFILE, { id: comment?.userId?._id });
            }}
          >
            <Image
              source={{ uri: comment?.userId?.imageURL }}
              style={styles.userImg}
            />
          </TouchableOpacity>
          <View style={styles.commentBox}>
            <View style={{ padding: 10 }}>
              <Row style={{ padding: 0 }}>
                <SubTitle>{comment?.userId?.fullName}</SubTitle>
                <Row style={{ padding: 0, position: "relative" }}>
                  {Visible && (
                    <View style={styles.options}>
                      <TouchableOpacity
                        onPress={() => (
                          setCommentEdit((prev) => !prev),
                          setVisible((prev) => !prev),
                          setEditValue(comment?.comment)
                        )}
                      >
                        <TextSmall style={{ fontSize: 13 }}>Edit</TextSmall>
                      </TouchableOpacity>
                      <HorizantalBar />
                      <TouchableOpacity
                        onPress={() => (
                          onCommentDelete(), setVisible((prev) => !prev)
                        )}
                      >
                        <TextSmall style={{ fontSize: 13 }}>Delete</TextSmall>
                      </TouchableOpacity>
                    </View>
                  )}
                  {/*========== three dot =========== */}
                  {userData?.data?._id === comment?.userId?._id && (
                    <TouchableOpacity
                      onPress={() => setVisible((prev) => !prev)}
                    >
                      <MaterialCommunityIcons
                        name="dots-vertical"
                        size={20}
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  )}
                </Row>
              </Row>
              {/* <TextSmall>{date}</TextSmall> */}
              <TimeAgo createdAt={comment?.createdAt} />
              <NormalText style={{ marginVertical: 5 }}>
                {comment?.comment}
              </NormalText>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 50,
            gap: 10,
            marginBottom: 10,
          }}
        >
          <Pressable onPress={onCommentsLikes}>
            <SubTitle>
              {comment.commentLikes}{" "}
              <Text style={isLiked && { color: colors.primary }}>
                {isLiked ? "Liked" : "Like"}
              </Text>
            </SubTitle>
          </Pressable>

          <SubTitle>|</SubTitle>

          <Pressable onPress={() => setCommentVisible((prev) => !prev)}>
            <SubTitle>Reply</SubTitle>
          </Pressable>
        </View>
        {/* =============comment edit Input Field============= */}
        {commentEdit && (
          <Input
            placeholder="Edit your comment !"
            multiline={true}
            value={editValue}
            selectionColor={colors.white}
            onChangeText={setEditValue}
            loading={loading}
            image={userData?.data?.imageURL}
            onPress={onCommentsEdit}
          />
        )}
        {/* ========Reply input field============ */}
        {commentVisible && (
          <Input
            placeholder="Leave Your Reply !"
            multiline={true}
            value={value}
            selectionColor={colors.white}
            onChangeText={setValue}
            loading={loading}
            image={userData?.data?.imageURL}
            onPress={onReply}
          />
        )}
        {/* ==========reply========== */}
        {comment?.replies
          ?.slice(0)
          .reverse()
          .map((reply) => (
            <Replies key={reply?._id} reply={reply} />
          ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
  },
  subContainer: {
    backgroundColor: colors.bg,
    marginLeft: 40,
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
  commentBox: {
    backgroundColor: colors.lightBg,
    width: "90%",
    borderRadius: 8,
    borderColor: colors.white,
  },
  subCommentBox: {
    backgroundColor: colors.lightBg,
    width: "89%",
    borderRadius: 8,
    borderColor: colors.white,
  },
  userImg: {
    height: 35,
    width: 35,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  input: {
    backgroundColor: colors.bg,
    color: colors.white,
    fontSize: 18,
    borderColor: colors.lightBg,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  button: {
    fontFamily: "SemiBold",
    fontSize: 16,
    color: colors.primary,
    alignSelf: "flex-end",
    paddingVertical: 10,
  },
});

export default Comments;
