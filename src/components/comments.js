import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import NavStr from "../Nav/NavStr";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";
import NormalText from "./normalText";
import Row from "./row";
import SubTitle from "./subTitle";
import TextSmall from "./textSmall";
import { timeAgo } from "./timeConvert";

const Comments = ({ comment, postId, config, setRefetch }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { userData } = useAuth();
  const isLiked = comment?.likes?.includes(userData?.data?._id);
  const navigation = useNavigation();

  const onCommentsLikes = async () => {
    setLoading((prev) => !prev);
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
      setLoading((prev) => !prev);
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
      setModalVisible((prev) => !prev);
      setValue("");
    } catch (error) {
      console.log(error);
    } finally {
      setRefetch(false);
    }
  };

  const date = timeAgo(comment?.createdAt);

  return (
    <View>
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
              <SubTitle>{comment?.userId?.fullName}</SubTitle>
              <TextSmall>{date}</TextSmall>
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

          <Pressable onPress={() => setModalVisible((prev) => !prev)}>
            <SubTitle>Reply</SubTitle>
          </Pressable>
        </View>
        {modalVisible && (
          <Row style={{ gap: 5 }}>
            <Image
              source={{ uri: userData?.data?.imageURL }}
              style={styles.userImg}
            />
            <ScrollView>
              <TextInput
                placeholder="Leave Your Reply ?"
                placeholderTextColor={colors.lightGray}
                multiline={true}
                value={value}
                selectionColor={colors.white}
                onChangeText={setValue}
                style={styles.input}
              />
            </ScrollView>
            <Pressable onPress={onReply} disabled={loading || !value}>
              <Text
                style={[
                  styles.button,
                  loading || value === ""
                    ? { color: colors.lightGray }
                    : { color: colors.primary },
                ]}
              >
                Reply
              </Text>
            </Pressable>
          </Row>
        )}
        {comment?.replies
          ?.slice(0)
          .reverse()
          .map((reply) => (
            <View key={reply?._id} style={styles.subContainer}>
              <View style={{ flexDirection: "row", gap: 5, padding: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(NavStr.PROFILE, {
                      id: reply?.userId?._id,
                    });
                  }}
                >
                  <Image
                    source={{ uri: reply?.userId?.imageURL }}
                    style={styles.userImg}
                  />
                </TouchableOpacity>
                <View style={styles.subCommentBox}>
                  <View style={{ padding: 10 }}>
                    <SubTitle>{reply?.userId?.fullName}</SubTitle>
                    {/* <TextSmall>Subtitle</TextSmall> */}
                    <TextSmall>{timeAgo(reply?.createdAt)}</TextSmall>
                    <NormalText style={{ marginVertical: 5 }}>
                      {reply?.reply}
                    </NormalText>
                  </View>
                </View>
              </View>
            </View>
          ))}
        {/* modal */}
        {/* <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          <InputField
            placeholder={"Add reply"}
            setValue={setValue}
            value={value}
          />
          <Text
            onPress={onReply}
            disabled={loading || !value}
            style={styles.btn}
          >
            Submit
          </Text>
        </CustomModal> */}
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
