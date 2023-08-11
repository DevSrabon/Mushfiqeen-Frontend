import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import NavStr from "../../Nav/NavStr";
import colors from "../../theme/Colors";
import TextSmall from "../textSmall";
import TimeAgo from "../timeAgo";
import Title from "../title";

const Messages = ({ m, userData }) => {
  const timestamp = m?.date;
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  const navigation = useNavigation();
  return (
    <View
      style={[
        {
          gap: 5,
          display: "flex",
          //   flexDirection: "row",
          marginBottom: 10,
          paddingHorizontal: 5,
        },
        userData?.data?._id === m.senderId
          ? { flexDirection: "row-reverse" }
          : { flexDirection: "row" },
      ]}
    >
      <Pressable
        key={m?.uid}
        onPress={() => {
          navigation.navigate(NavStr.PROFILE, { id: m?.senderId });
        }}
      >
        <Image
          source={{ uri: m?.photoURL }}
          style={[
            userData?.data?._id !== m.senderId
              ? [{ alignSelf: "flex-start" }, styles.userImg]
              : { display: "none" },
          ]}
        />
      </Pressable>
      <View style={{ width: "auto", maxWidth: "80%" }}>
        <View
          style={[
            {
              paddingHorizontal: 10,
              paddingVertical: 5,

              borderRadius: 10,
            },
            userData?.data?._id === m.senderId
              ? { backgroundColor: "#084B83" }
              : { backgroundColor: colors.lightBg },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",

              gap: 10,
            }}
          >
            <Title>{m?.name}</Title>
            <TimeAgo createdAt={date} ago={false} />
          </View>
          <TextSmall>{m?.texts}</TextSmall>
        </View>
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  userImg: {
    height: 40,
    width: 40,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
});
