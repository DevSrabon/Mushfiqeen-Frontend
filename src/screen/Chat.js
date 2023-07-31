import React from "react";
import { StyleSheet, Text } from "react-native";
import { Protect } from "../Nav/ProtectedRoute";
import { SubContainer } from "../components";

const Chat = () => {
  return (
    <SubContainer style={{ paddingTop: 20, paddingHorizontal: 20 }}>
      <Text style={[styles.text, styles.font]}>Chat</Text>
    </SubContainer>
  );
};

export default Protect(Chat);
const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  font: {
    fontSize: 20,
  },
});
