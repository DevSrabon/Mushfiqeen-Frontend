import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SubContainer } from "../components";
import CustomButton from "../components/customButton";
import Header from "../components/header";
import InputField from "../components/inpuField";
import { useAuth } from "../contexts/useAuth";
import { AntDesign } from "@expo/vector-icons";
import colors from "../theme/Colors";

const ForgetPass = (props) => {
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(null);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setToken } = useAuth();

  const onForget = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://musfiqeen-backend.vercel.app/api/v1/users/forgot-password",
        {
          email,
        }
      );

      if (response) {
        setShow(true);
      }
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else if (error.response.data.error) {
        alert(error.response.data.error);
      } else {
        error.message;
      }
    } finally {
      setLoading(false);
    }
  };
  const onReset = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://musfiqeen-backend.vercel.app/api/v1/users/reset-password/${code}`,
        {
          password,
        }
      );

      if (response) {
        setToken(response.data.accessToken);
      }
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else if (error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SubContainer>
      <AntDesign
        name="arrowleft"
        size={30}
        color={colors.white}
        onPress={() => navigation.goBack()}
        style={{ paddingHorizontal: 20, paddingTop: 10 }}
      />
      <View style={{ paddingTop: 50 }}>
        <Header>Forget Password</Header>
      </View>
      {!show ? (
        <>
          <InputField
            style={{ marginTop: 50 }}
            placeholder="Enter Your Email"
            value={email}
            setValue={setEmail}
            keyboardType="email-address"
          />
          <CustomButton
            text={"Send Reset Request"}
            onPress={() => onForget()}
            type="primary"
            loading={loading}
            disabled={loading}
            style={{ alignSelf: "center", marginTop: 20 }}
          />
        </>
      ) : (
        <>
          <InputField
            // style={{ marginTop: 50 }}
            placeholder="Reset Code"
            value={code}
            setValue={setCode}
            keyboardType="numeric"
            // error={error.email}
          />
          <InputField
            // style={{ marginTop: 50 }}
            placeholder="New Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
            // error={error.email}
          />
          <CustomButton
            text={"Reset Password"}
            onPress={() => onReset()}
            type="primary"
            loading={loading}
            disabled={loading}
            style={{ alignSelf: "center", marginTop: 20 }}
          />
        </>
      )}
    </SubContainer>
  );
};

export default ForgetPass;

const styles = StyleSheet.create({});
