import { AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { Protect } from "../Nav/ProtectedRoute";
import { Comments, Reactions, Row, SubContainer } from "../components";
import SkeletonMain from "../components/Skeleton/SkeletonMain";
import HomeCard from "../components/homeCard";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";

const PostDetails = (props) => {
  const { navigation } = props;
  const [texts, setTexts] = useState("");
  const [post, setPost] = useState([]);
  const {
    loading,
    setLoading,
    postId,
    userData,
    refetch: isRefetch,
  } = useAuth();
  console.log(postId);
  const [refetch, setRefetch] = useState(false);
  const isFocused = useIsFocused();

  const config = {
    headers: {
      Authorization: `Bearer ${userData?.accessToken}`,
    },
  };

  const onComment = async () => {
    if (!texts) {
      return alert("Comment can't be empty");
    }
    try {
      setLoading(true);
      await axios.put(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/comment/${post?._id}`,
        { comment: texts },
        config
      );
      setRefetch(true);
      console.log("Like updated successfully");
    } catch (error) {
      console.error("Error updating like:", error);
    } finally {
      setLoading(false);
      setRefetch(false);
      setTexts("");
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);

        const data = await axios.get(
          `https://musfiqeen-backend.vercel.app/api/v1/posts/comment/${postId?._id}`,
          config
        );
        setPost(data.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
    return () => {
      setPost(null);
    };
  }, [refetch, isFocused, isRefetch]);

  if (loading) return <SkeletonMain />;

  return (
    <SubContainer>
      <ScrollView>
        <Row>
          <AntDesign
            name="arrowleft"
            size={30}
            color={colors.white}
            onPress={() => navigation.goBack()}
          />
          <Reactions post={post} />
        </Row>

        <HomeCard post={postId} />

        <Row style={{ gap: 5 }}>
          <Image
            source={{ uri: userData?.data?.imageURL }}
            style={styles.userImg}
          />
          <ScrollView>
            <TextInput
              placeholder="Leave Your Thoughts ?"
              placeholderTextColor={colors.lightGray}
              multiline={true}
              value={texts}
              selectionColor={colors.white}
              onChangeText={setTexts}
              style={styles.input}
            />
          </ScrollView>
          <Pressable onPress={onComment} disabled={loading || !texts}>
            <Text
              style={[
                styles.button,
                loading || texts === ""
                  ? { color: colors.lightGray }
                  : { color: colors.primary },
              ]}
            >
              Comment
            </Text>
          </Pressable>
        </Row>

        {post?.comments?.map((comment) => (
          <Comments
            comment={comment}
            key={comment?._id}
            setRefetch={setRefetch}
            postId={post?._id}
            config={config}
          />
        ))}
      </ScrollView>
    </SubContainer>
  );
};
const styles = StyleSheet.create({
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

export default Protect(PostDetails);
