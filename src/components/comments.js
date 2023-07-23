import moment from "moment";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import icons from "../../assets/icons";
import colors from "../theme/Colors";
import NormalText from "./normalText";
import SubTitle from "./subTitle";
import TextSmall from "./textSmall";
const Comments = ({ comment }) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", gap: 5, padding: 10 }}>
          <Image source={icons.user} style={styles.userImg} />
          <View
            style={{
              backgroundColor: colors.lightBg,
              width: "90%",
              borderRadius: 8,
              borderColor: colors.white,
            }}
          >
            <View style={{ padding: 10 }}>
              <SubTitle>User Name</SubTitle>
              <TextSmall>Subtitle</TextSmall>
              <TextSmall>{moment(comment?.createdAt).fromNow()}</TextSmall>
              <NormalText style={{ marginVertical: 5 }}>
                {comment?.comment}
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
  userImg: {
    height: 35,
    width: 35,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
});

export default Comments;
