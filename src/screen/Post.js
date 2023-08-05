import React, { useState } from "react";
import axios from "axios";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { Row, SubContainer } from "../components";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";
import { AntDesign } from "@expo/vector-icons";
import NavStr from "../Nav/NavStr";

const Post = (props) => {
  const { navigation } = props;
  const [description, setDescription] = useState("");
  const { userData, setRefetch } = useAuth();
  const [loading, setLoading] = useState(false);

  const onPost = async () => {
    const headers = {
      Authorization: `Bearer ${userData?.accessToken}`,
      "Content-Type": "application/json",
    };
    try {
      setLoading(true);
      const response = await axios.post(
        `https://musfiqeen-backend.vercel.app/api/v1/posts/create`,
        { description },
        { headers }
      );
      setRefetch(true);
      if (response.status === 201) {
        navigation.navigate(NavStr.HOME);
        setDescription("");
      }
    } catch (error) {
      console.error("Error from post:", error);
      alert(error.response.data.error);
    } finally {
      setDescription("");
      setLoading(false);
      setRefetch(false);
    }
  };

  return (
    <SubContainer>
      <Row style={{ paddingVertical: 0 }}>
        <AntDesign
          name="arrowleft"
          size={30}
          color={colors.white}
          onPress={() => navigation.goBack()}
        />
        <Pressable onPress={onPost} disabled={loading}>
          <Text style={styles.button}>Post</Text>
        </Pressable>
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
