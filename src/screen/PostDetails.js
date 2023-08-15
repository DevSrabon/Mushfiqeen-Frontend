import { AntDesign } from "@expo/vector-icons";
import { useIsFocused, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { Protect } from "../Nav/ProtectedRoute";
import { Comments, Reactions, Row, SubContainer } from "../components";
import Input from "../components/TextInput";
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

    userData,
    refetch: isRefetch,
  } = useAuth();
  const router = useRoute();
  const { post: postId } = router.params;
  const [refetch, setRefetch] = useState(false);
  const isFocused = useIsFocused();

  const config = {
    headers: {
      Authorization: `Bearer ${userData?.accessToken}`,
    },
  };

  const onComment = useCallback(async () => {
    if (!texts) {
      return alert("Comment can't be empty");
    }
    try {
      setRefetch(true);
      setLoading(true);
      await axios.put(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/comment/${post?._id}`,
        { comment: texts },
        config
      );
    } catch (error) {
      console.error("Error updating like:", error);
    } finally {
      setLoading(false);
      setRefetch(false);
      setTexts("");
    }
  }, [post?._id, texts]);

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
  }, [postId?._id, refetch, isRefetch]);

  return (
    <SubContainer style>
      <ScrollView>
        <Row style={{ marginTop: StatusBar.currentHeight }}>
          <AntDesign
            name="arrowleft"
            size={30}
            color={colors.white}
            onPress={() => navigation.goBack()}
          />
          <Reactions post={post} />
        </Row>

        <HomeCard post={post} />

        <Input
          placeholder="Leave Your Comment !"
          multiline={true}
          value={texts}
          selectionColor={colors.white}
          onChangeText={setTexts}
          image={userData?.data?.imageURL}
          onPress={onComment}
          loading={loading}
        />

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
  button: {
    // fontFamily: "SemiBold",
    // fontSize: 16,
    // color: colors.primary,
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
