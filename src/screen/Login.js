import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Container from "../components/container";
import CustomButton from "../components/customButton";
import Header from "../components/header";
import InputField from "../components/inpuField";
import { useAuth } from "../contexts/useAuth";
const Login = () => {
  const { setUser, setToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const navigation = useNavigation();

  const onSignInPressed = async () => {
    try {
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
      console.log(response.data);
    } catch (error) {
      // Handle the error here
      console.error("Error signing up:", error);
    }
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <Container style={{ alignItems: "center" }}>
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

        <View style={{ flex: 1, width: "90%", gap: 10, marginTop: 20 }}>
          <CustomButton
            text="Login"
            onPress={onSignInPressed}
            type="primary"
            // loading={loading}
            // disabled={loading}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Text
            style={{
              fontFamily: "SemiBold",
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
    </ScrollView>
  );
};

export default Login;
