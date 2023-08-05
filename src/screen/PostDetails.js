import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Protect } from "../Nav/ProtectedRoute";
import { Comments, Reactions, Title } from "../components";
import SkeletonMain from "../components/Skeleton/SkeletonMain";
import Container from "../components/container";
import HomeCard from "../components/homeCard";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";
const PostDetails = () => {
  const [texts, setTexts] = useState("");
  const [post, setPost] = useState([]);
  const {
    loading,
    setLoading,
    postId,
    userData,
    refetch: isRefetch,
  } = useAuth();
  const [refetch, setRefetch] = useState(false);
  const isFocused = useIsFocused();

  const config = {
    headers: {
      Authorization: `Bearer ${userData?.accessToken}`,
    },
  };

  const onLikes = async () => {
    try {
      setLoading(true);
      await axios.put(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/likes/${post?._id}`,
        {},
        config
      );
      setRefetch(true);
      console.log("Like updated successfully");
    } catch (error) {
      console.error("Error updating like:", error);
    } finally {
      setLoading(false);
      setRefetch(false);
    }
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
  }, [refetch, isFocused && isRefetch]);

  if (loading) return <SkeletonMain />;
  return (
    <Container style={{ marginTop: StatusBar.currentHeight }}>
      <ScrollView style={{ backgroundColor: colors.bg }}>
        <View style={styles.container}>
          <HomeCard post={postId} />
          <Reactions post={post} />
          <View
            style={{
              borderColor: "grey",
              borderWidth: 1,
              borderRadius: 5,
              marginHorizontal: 5,
            }}
          >
            <Pressable onPress={onComment} disabled={loading || !texts}>
              <Text style={styles.button}>Comment</Text>
            </Pressable>
            <ScrollView>
              <TextInput
                placeholder="What do you want to talk about?"
                placeholderTextColor={colors.lightGray}
                textAlignVertical={"top"}
                multiline={true}
                numberOfLines={5}
                value={texts}
                selectionColor={colors.white}
                onChangeText={setTexts}
                style={{
                  backgroundColor: colors.bg,
                  color: colors.white,
                  fontSize: 18,
                  paddingHorizontal: 10,
                }}
              />
            </ScrollView>
          </View>
          <Title>Comments</Title>
          {/* <FlatList
            data={post?.comments}
            renderItem={({ item }) => <Comments comment={item} />}
            keyExtractor={(item) => item._id}
          /> */}
          {post?.comments?.map((comment) => (
            <Comments
              comment={comment}
              key={comment?._id}
              setRefetch={setRefetch}
              postId={post?._id}
              config={config}
            />
          ))}
        </View>
      </ScrollView>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    width: "100%",
    marginBottom: 10,
    // height: 400,
  },
  button: {
    fontFamily: "SemiBold",
    fontSize: 16,
    color: colors.primary,
    alignSelf: "flex-end",
    marginRight: 20,
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
