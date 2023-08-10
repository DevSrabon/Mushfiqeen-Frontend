import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../theme/Colors";

const Messages = ({ m, userData }) => {
  return (
    <View
      style={[
        {
          gap: 5,
          display: "flex",
          flexDirection: "row",
          marginBottom: 10,
        },
        userData?.data?._id === m.senderId
          ? { flexDirection: "row" }
          : { flexDirection: "row-reverse" },
      ]}
    >
      <Image source={{ uri: m?.photoURL }} style={styles.userImg} />
      <View>
        <Text style={{ textAlign: "justify", color: colors.white }}>
          {m?.texts}
        </Text>
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  userImg: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
});
