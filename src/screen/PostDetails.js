import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import icons from "../../assets/icons";
import {
  Comments,
  HorizantalBar,
  IconContainer,
  Reactions,
  Row,
  SubRow,
  SubTitle,
  TextSmall,
  Title,
} from "../components";
import Container from "../components/container";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";
const PostDetails = () => {
  const [texts, setTexts] = useState("");
  const [post, setPost] = useState([]);
  const { loading, setLoading, postId, userData } = useAuth();
  // console.log("🚀 ~ file: PostDetails.js:34 ~ PostDetails ~ postId:", postId);
  const [refetch, setRefetch] = useState(false);
  const route = useRoute();
  // const {  } = route.params;

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
  }, [refetch]);

  // if (loading) return <Loading />;
  return (
    <Container style={{ marginTop: StatusBar.currentHeight }}>
      <ScrollView style={{ backgroundColor: colors.bg }}>
        <View style={styles.container}>
          <Row>
            <SubRow>
              <Image
                source={icons.user}
                resizeMode="cover"
                style={styles.userImg}
              />
              <View>
                <Title>{post?.user?.fullName}</Title>
                <SubTitle>Sub title of user</SubTitle>
              </View>
            </SubRow>
            <SubRow>
              <AntDesign name="plussquareo" size={16} color={colors.primary} />
              <Title style={{ color: colors.primary }}>Follow</Title>
            </SubRow>
          </Row>
          <View
            style={{
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
          <Reactions />
          <View
            style={{
              borderColor: "grey",
              borderWidth: 1,
              borderRadius: 5,
              marginHorizontal: 5,
            }}
          >
            <Pressable onPress={onComment} disabled={loading}>
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

export default PostDetails;
