import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import NavStr from "../Nav/NavStr";
import { Container } from "../components";
import CustomButton from "../components/customButton";
import Header from "../components/header";
import InputField from "../components/inpuField";
import Row from "../components/row";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";

const VerifyCode = ({ navigation }) => {
  const router = useRoute();
  const { setToken, userData } = useAuth();
  const [email, setEmail] = useState("" || email || router?.params?.email);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onVerify = async () => {
    setLoading((prev) => !prev);
    try {
      const res = await axios.get(
        `https://musfiqeen-backend.vercel.app/api/v1/users/confirm/${
          email || router?.params?.email
        }/code/${code}`
      );
      if (res.data.accessToken) {
        navigation.navigate(NavStr.PARENT);
      }

      setToken(res.data.accessToken);
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else if (error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert(error.message);
      }
    } finally {
      setLoading((prev) => !prev);
    }
  };
  return (
    <Container>
      <Row style={{ paddingTop: StatusBar.currentHeight }}>
        <AntDesign
          name="arrowleft"
          size={30}
          color={colors.secondary}
          onPress={() => navigation.goBack()}
        />

        <Header>Verify Your Email</Header>
      </Row>
      <InputField
        value={email || router?.params?.email}
        setValue={setEmail}
        placeholder={"Email"}
        // defaultValue={router?.params?.email}
      />
      <InputField
        value={code}
        placeholder={"Code"}
        keyboardType={"numeric"}
        setValue={setCode}
      />
      <CustomButton
        text={"Verify"}
        type={"primary"}
        style={[styles.text, { alignSelf: "center" }]}
        onPress={onVerify}
        disabled={loading || !email || code.length <= 4}
        loading={loading}
      />
    </Container>
  );
};

export default VerifyCode;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 70,
  },
});
