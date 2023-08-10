import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Row from "./row";
import SubContainer from "./subContainer";
import colors from "../theme/Colors";
import Title from "./title";
import { useNavigation } from "@react-navigation/native";
import NavStr from "../Nav/NavStr";

const CustomBottom = () => {
  const navigation = useNavigation();
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
        <TouchableOpacity
          style={styles.switch}
          onPress={() => navigation.navigate(NavStr.PROFILE_CHAT)}
        >
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
