import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import NavStr from "../Nav/NavStr";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";
import useCreateChat from "./Chats/useCreateChat";
import Row from "./row";
import Title from "./title";

const CustomBottom = () => {
  const navigation = useNavigation();
  const { profile } = useAuth();

  const onSendMessage = useCreateChat(profile);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Row style={{ gap: 20 }}>
        <TouchableOpacity
          style={styles.switch}
          onPress={() => navigation.navigate(NavStr.PROFILE_POST)}
        >
          <MaterialIcons name={"post-add"} size={24} color={colors.secondary} />
          <Title>Posts</Title>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.switch}
          onPress={() => navigation.navigate(NavStr.PROFILE_BAYAN)}
        >
          <Entypo name={"sound"} size={24} color={colors.secondary} />
          <Title>Bayan</Title>
        </TouchableOpacity>
        <TouchableOpacity style={styles.switch} onPress={onSendMessage}>
          <MaterialIcons name={"chat"} size={24} color={colors.secondary} />
          <Title>Chat</Title>
        </TouchableOpacity>
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  switch: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightBg,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

export default CustomBottom;
