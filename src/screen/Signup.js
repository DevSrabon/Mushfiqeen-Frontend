import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Container from "../components/container";
import CustomButton from "../components/customButton";
import Header from "../components/header";
import InputField from "../components/inpuField";
import { useAuth } from "../contexts/useAuth";
const Signup = () => {
  const { loading, setLoading, setToken } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const apiUrl = "http://localhost:5000/api/v1/users/signup";
  const fullName = firstName + " " + lastName;

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://musfiqeen-backend.vercel.app//api/v1/users/signup",
        {
          email,
          password,
          confirmPassword: password,
          fullName,
        }
      );

      if (response.status === 200) {
        navigation.navigate("verifyCode");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Container style={{ alignItems: "center" }}>
        <Header style={{ marginTop: 50 }}>Signup</Header>

        <InputField
          style={{ marginTop: 50 }}
          placeholder="Your First Name"
          value={firstName}
          setValue={setFirstName}
          error={error.firstName}
        />

        <InputField
          placeholder="Your Last Name"
          value={lastName}
          setValue={setLastName}
          error={error.lastName}
        />

        <InputField
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
        <View>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 14,
              lineHeight: 20,
              marginBottom: 10,
              marginHorizontal: 10,
            }}
          >
            By signing up you agree to our{" "}
            <Text style={{ fontSize: 16 }}>Terms & Conditions</Text> and{" "}
            <Text style={{ fontSize: 16 }}>Privacy Policy.*</Text>
          </Text>
          {/* {error?.errorMsg && (
            <Text
              style={{
                color: "orange",
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              {error?.errorMsg}
            </Text>
          )} */}
        </View>

        <View style={{ flex: 1, width: "90%" }}>
          <CustomButton
            text="Continue"
            loading={loading}
            disabled={loading}
            onPress={onSignup}
            type="primary"
          />
        </View>
        {/* <View style={{ flex: 1, width: "90%" }}>
          <CustomButton
            text="Google"
            loading={loading}
            disabled={loading}
            onPress={onGoogleButtonPress}
            type="primary"
          />
        </View> */}
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
            Already signed up ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text
              style={{
                fontFamily: "SemiBold",
                color: "#B4AAF2",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    </ScrollView>
  );
};

export default Signup;
