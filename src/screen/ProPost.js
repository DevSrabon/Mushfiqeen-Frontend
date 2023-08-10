import { View, Text, StatusBar } from "react-native";
import React from "react";
import { SubContainer } from "../components";
import Title from "../components/title";
import { EvilIcons } from "@expo/vector-icons";
import Row from "../components/row";
import colors from "../theme/Colors";

const ProPost = ({ navigation }) => {
  return (
    <SubContainer>
      <Row style={{ marginTop: StatusBar.currentHeight }}>
        <EvilIcons
          name="close"
          size={30}
          color={colors.secondary}
          onPress={() => navigation.goBack()}
        />

        <Title>All Posts</Title>
      </Row>
    </SubContainer>
  );
};

export default ProPost;
