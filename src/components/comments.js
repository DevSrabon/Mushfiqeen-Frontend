import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";
import CustomModal from "./customModal";
import InputField from "./inpuField";
import NormalText from "./normalText";
import SubTitle from "./subTitle";
import TextSmall from "./textSmall";
const Comments = ({ comment, postId, config, setRefetch }) => {
  console.log("🚀 ~ file: comments.js:14 ~ Comments ~ comment:", comment);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState("");

  const { userData } = useAuth();
  const isLiked = comment?.likes?.includes(userData?.data?._id);
  const onCommentsLikes = async () => {
    try {
      await axios.put(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/${postId}/comments/${comment?._id}/like`,
        {},
        config
      );
      setRefetch(true);
    } catch (error) {
      console.log(error);
    } finally {
      setRefetch(false);
    }
  };
  const onReply = async () => {
    try {
      const rest = await axios.put(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/reply/${postId}`,
        { replyText: value, commentId: comment?._id },
        config
      );

      setRefetch(true);
      setModalVisible(false);
      setValue("");
    } catch (error) {
      console.log(error);
    } finally {
      setRefetch(false);
    }
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", gap: 5, padding: 10 }}>
          <Image
            source={{ uri: comment?.userId?.imageURL }}
            style={styles.userImg}
          />
          <View style={styles.commentBox}>
            <View style={{ padding: 10 }}>
              <SubTitle>{comment?.userId?.fullName}</SubTitle>
              <TextSmall>Subtitle</TextSmall>
              <TextSmall>{moment(comment?.createdAt).fromNow()}</TextSmall>
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
              <Text style={isLiked && { color: "blue" }}>
                {isLiked ? "Liked" : "Like"}
              </Text>
            </SubTitle>
          </Pressable>

          <SubTitle>|</SubTitle>

          <Pressable onPress={() => setModalVisible(true)}>
            <SubTitle>Reply</SubTitle>
          </Pressable>
        </View>
        {comment?.replies
          ?.slice(0)
          .reverse()
          .map((reply) => (
            <View key={reply?._id} style={styles.subContainer}>
              <View style={{ flexDirection: "row", gap: 5, padding: 10 }}>
                <Image
                  source={{ uri: reply?.userId?.imageURL }}
                  style={styles.userImg}
                />
                <View style={styles.subCommentBox}>
                  <View style={{ padding: 10 }}>
                    <SubTitle>{reply?.userId?.fullName}</SubTitle>
                    {/* <TextSmall>Subtitle</TextSmall> */}
                    <TextSmall>{moment(reply?.createdAt).fromNow()}</TextSmall>
                    <NormalText style={{ marginVertical: 5 }}>
                      {reply?.reply}
                    </NormalText>
                  </View>
                </View>
              </View>
            </View>
          ))}
        {/* modal */}
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          <InputField
            placeholder={"Add reply"}
            setValue={setValue}
            value={value}
          />
          <Text onPress={onReply} style={styles.btn}>
            Submit
          </Text>
        </CustomModal>
      </View>
    </View>
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
  btn: {
    backgroundColor: "#B4AAF2",
    width: "90%",
    textAlign: "center",
    textAlignVertical: "center",
    height: 40,
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    borderRadius: 5,
  },
});

export default Comments;
