import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import colors from "../theme/Colors";
import Title from "./title";
import icons from "../../assets/icons";
import SubTitle from "./subTitle";
import TextSmall from "./textSmall";
import NormalText from "./normalText";

const Comments = () => {
  return (
    <View>
      <View style={styles.container}>
        <Title>Comments</Title>
        <View style={{ flexDirection: "row", gap: 5, padding: 10 }}>
          <Image source={icons.user} style={styles.userImg} />
          <View style={styles.commentBox}>
            <View style={{ padding: 10 }}>
              <SubTitle>User Name</SubTitle>
              <TextSmall>Subtitle</TextSmall>
              <TextSmall>2d</TextSmall>
              <NormalText style={{ marginVertical: 5 }}>
                Some thing comment about some thing that is for a example and
                want to test what about this comment section i wan t to m ake a
                big comment
              </NormalText>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginLeft: 50,
          gap: 10,
          marginBottom: 10,
        }}
      >
        <Pressable>
          <SubTitle>Like</SubTitle>
        </Pressable>

        <SubTitle>|</SubTitle>

        <Pressable>
          <SubTitle>Reply</SubTitle>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
  },
  commentBox: {
    backgroundColor: colors.lightBg,
    width: "90%",
    borderRadius: 8,
    borderColor: colors.white,
  },
  userImg: {
    height: 35,
    width: 35,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
});

export default Comments;
