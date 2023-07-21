import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { TextInput } from "react-native";
import Container from "../components/container";
import CustomButton from "../components/customButton";
import Header from "../components/header";
import { useAuth } from "../contexts/useAuth";

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
    <Container
      style={{
        justifyContent: "center",
        paddingHorizontal: "5%",
      }}
    >
      <Header>Post</Header>
      <TextInput
        multiline={true}
        numberOfLines={10}
        onChangeText={setDescription}
        style={{ backgroundColor: "white", marginBottom: 10 }}
      />
      <CustomButton text={"Post Now"} onPress={onPost} type={"primary"} />
    </Container>
  );
};

export default Post;
