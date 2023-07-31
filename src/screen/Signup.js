import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import AddImages from "../components/AddImages";
import Container from "../components/container";
import CustomButton from "../components/customButton";
import Header from "../components/header";
import InputField from "../components/inpuField";
import { useAuth } from "../contexts/useAuth";
import useImagePicker from "../hooks/useImagePicker";
const Signup = () => {
  const { loading, setLoading, setToken } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const apiUrl = "http://localhost:5000/api/v1/users/signup";
  const fullName = firstName + " " + lastName;

  const { imageURL, loading: imgLoading, takePhoto } = useImagePicker();
  console.log(imageURL?.[0]);
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
          imageURL: imageURL?.[0],
          designation,
        }
      );

      if (response.status === 200) {
        navigation.navigate("verifyCode", (state = { email }));
      }
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container style={{ alignItems: "center" }}>
      <ScrollView>
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
        <AddImages
          imageUrls={imageURL}
          takePhoto={takePhoto}
          error={error.errorImg}
        />
        <InputField
          placeholder="Occupation"
          value={designation}
          setValue={setDesignation}
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
        </View>

        <CustomButton
          text="Continue"
          loading={loading || imgLoading}
          disabled={loading || imgLoading}
          onPress={onSignup}
          type="primary"
        />
        {/* <View style={{ flex: 1, width: "90%" }}></View> */}
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
      </ScrollView>
    </Container>
  );
};

export default Signup;
