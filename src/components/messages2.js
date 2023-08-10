import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../theme/Colors";
import SubRow from "./subRow";
import Title from "./title";

const Messages = ({ m, userData }) => {
  return (
    <View

    // style={[
    //   {
    //     gap: 5,
    //     flexDirection: "row",
    //     marginBottom: 10,
    //     // alignItems: "flex-start",
    //   },
    //   // userData?.data?._id === m.senderId
    //   //   ? [{ flexDirection: "row" }]
    //   //   : [{ flexDirection: "row-reverse" }],
    // ]}
    >
      <SubRow>
        <Image
          source={{ uri: m?.photoURL }}
          style={styles.userImg}
          // style={[
          //   userData?.data?._id === m.senderId
          //     ? [{ alignSelf: "flex-start" }, styles.userImg]
          //     : [{ alignSelf: "flex-end" }, styles.userImg],
          // ]}
        />
        <Title>Name Of User</Title>
      </SubRow>

      <View
      // style={[
      //   userData?.data?._id === m.senderId
      //     ? [styles.container1]
      //     : [styles.container2],
      // ]}
      >
        <Text
          style={{
            color: colors.bg,
            paddingHorizontal: 10,
            paddingVertical: 15,
          }}
        >
          {m?.texts}
        </Text>
      </View>
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
    // alignSelf: "flex-start",
  },
});
