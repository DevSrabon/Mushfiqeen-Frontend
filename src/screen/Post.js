import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import Container from "../components/container";
import CustomButton from "../components/customButton";
import Header from "../components/header";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";

const Post = () => {
  const [description, setDescription] = useState("");
  const navigation = useNavigation();
  const { userData, setRefetch } = useAuth();
  const onPost = async () => {
    const headers = {
      Authorization: `Bearer ${userData?.accessToken}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/create`,
        { description },
        { headers }
      );
      setRefetch(true);
      if (response.status === 201) {
        setDescription("");
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Error from post:", error);
    } finally {
      setRefetch(false);
    }
  };

  return (
    <SubContainer>
      <Pressable onPress={onPost}>
        <Text style={styles.button}>Post</Text>
      </Pressable>
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
    color: colors.primary,
    alignSelf: "flex-end",
    marginRight: 20,
    paddingVertical: 10,
  },
});

export default Post;
