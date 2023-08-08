import React from "react";
import { StyleSheet } from "react-native";
import { SubContainer } from "../components";
import Header from "../components/header";

const Chat = () => {
  return (
    <SubContainer style={{ paddingTop: 20, paddingHorizontal: 10 }}>
      <Header>Chat Message</Header>
    </SubContainer>
  );
};

export default Chat;

const styles = StyleSheet.create({});
