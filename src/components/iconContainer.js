import { View, Pressable } from "react-native";
import React from "react";
import { AntDesign, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import TextSmall from "./textSmall";
import colors from "../theme/Colors";
import { useNavigation } from "@react-navigation/native";

const IconContainer = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        paddingHorizontal: 30,
      }}
    >
      <Pressable style={{ alignItems: "center" }}>
        <AntDesign name="like2" size={18} color={colors.white} />
        <TextSmall>Like</TextSmall>
      </Pressable>

      <Pressable
        style={{ alignItems: "center" }}
        onPress={() => navigation.navigate("postDetails")}
      >
        <FontAwesome5 name="comment-dots" size={18} color={colors.white} />
        <TextSmall>Comment</TextSmall>
      </Pressable>

      <Pressable style={{ alignItems: "center" }}>
        <FontAwesome5 name="share-square" size={18} color={colors.white} />
        <TextSmall>Share</TextSmall>
      </Pressable>
      <Pressable style={{ alignItems: "center" }}>
        <FontAwesome name="send" size={18} color={colors.white} />
        <TextSmall>Send</TextSmall>
      </Pressable>
    </View>
  );
};

export default IconContainer;
