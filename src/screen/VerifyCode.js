import { useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Container } from "../components";
import CustomButton from "../components/customButton";
import Header from "../components/header";
import InputField from "../components/inpuField";
import { useAuth } from "../contexts/useAuth";

const VerifyCode = () => {
  const router = useRoute();
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const onVerify = async () => {
    try {
      const res = await axios.get(
        `https://musfiqeen-backend.vercel.app/api/v1/users/confirm/${
          email || router?.params?.email
        }/code/${code}`
      );
      console.log(res.data);
      setToken(res.data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container style={styles.container}>
      <Header>Verify Your Email</Header>
      <InputField
        value={email || router?.params?.email}
        setValue={setEmail}
        placeholder={"Email"}
        // defaultValue={router?.params?.email}
      />
      <InputField value={code} placeholder={"Code"} setValue={setCode} />
      <CustomButton
        text={"Verify"}
        type={"primary"}
        style={styles.text}
        onPress={onVerify}
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
