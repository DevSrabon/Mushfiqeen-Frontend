import { EvilIcons } from "@expo/vector-icons";
import React from "react";
import { StatusBar } from "react-native";
import { SubContainer } from "../components";
import Row from "../components/row";
import Title from "../components/title";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";

const ProBayan = ({ navigation }) => {
  const { bayan } = useAuth();
  // console.log("🚀 ~ file: ProBayan.js:12 ~ ProBayan ~ bayan:", bayan);
  return (
    <SubContainer>
      <Row style={{ marginTop: StatusBar.currentHeight }}>
        <EvilIcons
          name="close"
          size={30}
          color={colors.secondary}
          onPress={() => navigation.goBack()}
        />

        <Title>All Bayan</Title>
      </Row>
    </SubContainer>
  );
};

export default ProBayan;
