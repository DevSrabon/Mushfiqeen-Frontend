import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { BayanCard, Row, SubContainer } from "../components";
import colors from "../theme/Colors";
import { useNavigation } from "@react-navigation/native";

const Bayan = () => {
  const navigation = useNavigation();
  return (
    <SubContainer>
      <Pressable
        style={{ marginBottom: 10 }}
        onPress={() => navigation.navigate("bayanPost")}
      >
        <Text style={styles.postButton}>Post Bayan</Text>
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable>
          <Text style={styles.button}>বাংলা</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.button}>English</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.button}>Français</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.button}>اردو</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.button}>عربي</Text>
        </Pressable>
      </View>

      <BayanCard />
    </SubContainer>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    minWidth: 100,
  },
  button: {
    fontFamily: "SemiBold",
    fontSize: 16,
    color: colors.white,
    alignSelf: "center",
    paddingVertical: 5,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  postButton: {
    fontFamily: "SemiBold",
    fontSize: 20,
    color: colors.white,
    alignSelf: "flex-end",
    marginRight: 20,
    paddingVertical: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
  },
});

export default Bayan;
