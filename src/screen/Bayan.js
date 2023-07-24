import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { BayanCard, SubContainer } from "../components";
import colors from "../theme/Colors";
import { useNavigation } from "@react-navigation/native";

const Bayan = () => {
  const navigation = useNavigation();
  return (
    <SubContainer>
      <Pressable onPress={() => navigation.navigate("bayanPost")}>
        <Text style={styles.button}>Post Bayan</Text>
      </Pressable>
      <BayanCard />
    </SubContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    fontFamily: "SemiBold",
    fontSize: 20,
    color: colors.primary,
    alignSelf: "flex-end",
    marginRight: 20,
    paddingVertical: 5,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
  },
});

export default Bayan;
