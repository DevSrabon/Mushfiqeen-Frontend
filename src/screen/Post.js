import { AntDesign } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import NavStr from "../Nav/NavStr";
import { Row, SubContainer } from "../components";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";

const Post = (props) => {
  const post = props?.route?.params?.post;
  const { navigation } = props;
  const [description, setDescription] = useState("");
  const { userData, setRefetch } = useAuth();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (post) setDescription(post?.description);
  }, [post]);
  const onPost = async () => {
    const headers = {
      Authorization: `Bearer ${userData?.accessToken}`,
      "Content-Type": "application/json",
    };
    try {
      setLoading((prev) => !prev);
      const response = await axios.post(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/create`,
        { description },
        { headers }
      );
      setRefetch(true);
      if (response.status === 201) {
        setDescription("");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: NavStr.HOME }],
          })
        );
      }
    } catch (error) {
      console.error("Error from post:", error);
      alert(error.response.data.error);
    } finally {
      setDescription("");
      setLoading(false);
      setRefetch(false);
      setLoading(false);
    }
  };
  const onUpdate = async () => {
    const headers = {
      Authorization: `Bearer ${userData?.accessToken}`,
      "Content-Type": "application/json",
    };
    try {
      setLoading(true);
      const response = await axios.put(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/update/${post?._id}`,
        { description },
        { headers }
      );
      setRefetch(true);
      if (response.status === 201) {
        setDescription("");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: NavStr.HOME }],
          })
        );
      }
    } catch (error) {
      console.error("Error from post:", error);
      alert(error.response.data.error);
    } finally {
      setDescription("");
      setLoading(false);
      setRefetch(false);
      setLoading(false);
    }
  };

  return (
    <SubContainer>
      <Row style={{ paddingVertical: 0, marginTop: StatusBar.currentHeight }}>
        <AntDesign
          name="arrowleft"
          size={30}
          color={colors.white}
          onPress={() => navigation.goBack()}
        />
        {post ? (
          <Pressable
            onPress={onUpdate}
            disabled={loading || description === ""}
          >
            <Text
              style={[
                styles.button,
                loading || description === ""
                  ? { color: colors.lightGray }
                  : { color: colors.primary },
              ]}
            >
              Update
            </Text>
          </Pressable>
        ) : (
          <Pressable onPress={onPost} disabled={loading || description === ""}>
            <Text
              style={[
                styles.button,
                loading || description === ""
                  ? { color: colors.lightGray }
                  : { color: colors.primary },
              ]}
            >
              Post
            </Text>
          </Pressable>
        )}
      </Row>

      <ScrollView>
        <TextInput
          placeholder="What do you want to talk about?"
          placeholderTextColor={colors.lightGray}
          textAlignVertical={"top"}
          multiline={true}
          numberOfLines={18}
          maxHeight={450}
          selectionColor={colors.white}
          onChangeText={setDescription}
          value={description}
          style={{
            backgroundColor: colors.bg,
            color: colors.white,
            fontSize: 18,
            paddingHorizontal: 10,
          }}
        />
      </ScrollView>
    </SubContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    fontFamily: "SemiBold",
    fontSize: 20,
    alignSelf: "flex-end",
    marginRight: 20,
    paddingVertical: 10,
  },
});

export default Post;
