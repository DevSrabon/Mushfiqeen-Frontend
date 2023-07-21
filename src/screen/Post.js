import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";
import Container from "../components/container";
import CustomButton from "../components/customButton";
import Header from "../components/header";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";
import { SubContainer } from "../components";

const Post = () => {
  const [description, setDescription] = useState();
  const navigate = useNavigation();
  const { userData, setRefetch } = useAuth();
  const onPost = async () => {
    const headers = {
      Authorization: `Bearer ${userData?.accessToken}`,
      "Content-Type": "application/json",
    };

    // Making the POST request using Axios
    axios
      .post(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/create`,
        { description },
        { headers }
      )
      .then((response) => {
        // Handle the response data here
        console.log("Response:", response);
        if (response.status === 200) {
          setRefetch(true);
          navigate.navigate("home");
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
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
