import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SubContainer } from "../components";
import CustomButton from "../components/customButton";
import Header from "../components/header";
import InputField from "../components/inpuField";
import Row from "../components/row";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";

const ForgetPass = (props) => {
  const { email: emails } = props?.route?.params;
  const { navigation } = props;
  const [email, setEmail] = useState("" || emails);
  const [code, setCode] = useState("");
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
      setCode("");
      setPassword("");
    }
  };
  const onReset = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://musfiqeen-backend.vercel.app/api/v1/users/reset-password/${code}`,
        {
          password: password.trim().toLowerCase(),
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
      setCode("");
      setPassword("");
    }
  };

  return (
    <SubContainer>
      <Row style={{ paddingTop: StatusBar.currentHeight }}>
        <AntDesign
          name="arrowleft"
          size={30}
          color={colors.white}
          onPress={() => navigation.goBack()}
          style={{ paddingTop: 10 }}
        />
        <Header>Forget Password</Header>
      </Row>
      <View style={{ paddingTop: 50 }}></View>
      {!show ? (
        <>
          <InputField
            style={{ marginTop: 50 }}
            placeholder="Enter Your Email"
            value={email}
            setValue={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
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
            autoCapitalize="none"
          />
          <CustomButton
            text={"Reset Password"}
            onPress={() => onReset()}
            type="primary"
            loading={loading}
            disabled={loading || code <= 4 || password.length <= 5}
            style={{ alignSelf: "center", marginTop: 20 }}
          />
          <View style={{ width: "100%", alignItems: "flex-end" }}>
            <TouchableOpacity onPress={onForget}>
              <Text
                style={{
                  fontFamily: "SemiBold",
                  color: colors.white,
                  textAlign: "right",
                  marginRight: 20,
                  marginTop: 10,
                }}
              >
                Resend Code
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SubContainer>
  );
};

export default ForgetPass;

const styles = StyleSheet.create({});
