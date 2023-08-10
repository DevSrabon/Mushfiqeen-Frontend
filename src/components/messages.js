import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../theme/Colors";
import Title from "./title";
import SubRow from "./subRow";
import HorizontalBar from "./horizontalBar";
import SubTitle from "./subTitle";

const Messages = ({ m, userData }) => {
  return (
    <View>
      <SubRow style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
        <Image
          source={{ uri: m?.photoURL }}
          style={styles.userImg}
          // style={[
          //   userData?.data?._id === m.senderId
          //     ? [{ alignSelf: "flex-start" }, styles.userImg]
          //     : [{ alignSelf: "flex-end" }, styles.userImg],
          // ]}
        />
        <View>
          <SubRow>
            <Title>Name Of User</Title>
            <SubTitle style={{ color: colors.primary, paddingHorizontal: 10 }}>
              |
            </SubTitle>
            <SubTitle>2h ago</SubTitle>
          </SubRow>

          <SubTitle> {m?.texts}</SubTitle>
        </View>
      </SubRow>

      <HorizontalBar style={{ width: "80%" }} />
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container1: {
    // alignSelf: "flex-start",
    width: "auto",
    maxWidth: "65%",
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
  },
  container2: {
    // alignSelf: "flex-end",
    width: "auto",
    maxWidth: "65%",
    backgroundColor: colors.secondary,
    borderRadius: 10,
  },
  userImg: {
    height: 40,
    width: 40,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
});
