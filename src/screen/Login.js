import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Container from "../components/container";
import CustomButton from "../components/customButton";
import Header from "../components/header";
import InputField from "../components/inpuField";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";

const Login = () => {
  const { userData, setToken, loading, setLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const navigation = useNavigation();
  const router = useRoute();

  const onSignInPressed = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://musfiqeen-backend.vercel.app/api/v1/users/login",
        {
          email,
          password,
        }
      );

      // setUser(response.data.data)
      setToken(response.data.accessToken);
      // AsyncStorage.setItem("token", response.data.accessToken);
    } catch (error) {
      if (error.message === "Request failed with status code 402") {
        navigation.navigate("verifyCode", (state = { email }));
      }
      if (
        error.message !== "Request failed with status code 402" &&
        error.response.data.message
      ) {
        alert(
          error.message !== "Request failed with status code 402" &&
            error.response.data.message
        );
      } else if (error.response.data.error) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.data && userData?.data?.role !== "inactive") {
      // navigation.navigate(router?.params?.from || "parent");
      navigation.navigate("parent");
    } else if (userData?.data?.status === "inactive") {
      navigation.navigate("verifyCode");
    }
  }, [navigation, userData?.data?.role]);

  return (
    <Container style={{ alignItems: "center", padding: 20 }}>
      <Header style={{ marginTop: 50 }}>Login</Header>

      <InputField
        style={{ marginTop: 50 }}
        placeholder="Your Email"
        value={email}
        setValue={setEmail}
        keyboardType="email-address"
        error={error.email}
      />

      <InputField
        placeholder="Your Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
        error={error.password}
      />

      <CustomButton
        text="Login"
        onPress={onSignInPressed}
        type="primary"
        loading={loading}
        disabled={loading}
      />

      {/* <View style={{ flex: 1, gap: 10, marginTop: 20 }}></View> */}
      <View style={{ width: "100%", alignItems: "flex-end" }}>
        <TouchableOpacity onPress={() => navigation.navigate("forgetPass")}>
          <Text
            style={{
              fontFamily: "SemiBold",
              color: "#B4AAF2",
              textAlign: "right",
            }}
          >
            Forget Password?
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          alignSelf: "center",

          gap: 3,
        }}
      >
        <Text
          style={{
            fontFamily: "SemiBold",
            color: colors.primary,
          }}
        >
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
          <Text
            style={{
              fontFamily: "SemiBold",
              color: "#B4AAF2",
            }}
          >
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Login;
