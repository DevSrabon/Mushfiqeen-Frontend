import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import icons from "../../assets/icons";
import {
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
  const [posts, setPosts] = useState();
  const { refetch } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://musfiqeen-backend.vercel.app/api/v1/posts/get"
        );
        setPosts(res.data.data);
      } catch (error) {
        console.log({ error });
      }
    };
    fetchData();
  }, [refetch]);
  return (
    <ScrollView>
      <Container>
        <View>
          {posts?.map((post) => (
            <View key={post?._id} style={styles.container}>
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
                  <AntDesign
                    name="plussquareo"
                    size={16}
                    color={colors.primary}
                  />
                  <Title style={{ color: colors.primary }}>Follow</Title>
                </SubRow>
              </Row>
              <View
                style={{
                  height: 250,
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
                  <TextSmall>299</TextSmall>
                </SubRow>
                <SubRow style={{ gap: 3 }}>
                  <TextSmall style={{ color: colors.primary }}>299</TextSmall>
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
              <IconContainer />
              <Reactions />
            </View>
          ))}
        </View>
      </Container>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    width: "100%",
    marginBottom: 10,
    // height: 400,
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
