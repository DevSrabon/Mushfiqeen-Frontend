import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../components/customButton";
import Header from "../components/header";
import InputField from "../components/inpuField";
import { useAuth } from "../contexts/useAuth";
import useImagePicker from "../hooks/useImagePicker";
import colors from "../theme/Colors";
import NavStr from "../Nav/NavStr";
import { MaterialIcons } from "@expo/vector-icons";
import SubContainer from "../components/subContainer";
import { AntDesign } from "@expo/vector-icons";

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
        navigation.navigate(NavStr.VERIFYCODE, (state = { email }));
      }
    } catch (error) {
      console.log(error.response.data.error);
      switch (error) {
        case error.toLowerCase.includes("email"):
          setError();

        default:
          break;
      }
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else if (error.response.data.error) {
        alert(error.response.data.error);
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
        onPress={() => navigation.navigate(NavStr.HOME)}
        style={{ paddingHorizontal: 10, paddingTop: 10 }}
      />
      <ScrollView>
        <Header>Signup</Header>

        <View style={{ alignItems: "center" }}>
          {!imageURL.length ? (
            <>
              <TouchableOpacity
                onPress={takePhoto}
                style={{ borderColor: "red" }}
              >
                {loading ? (
                  <>
                    <View style={{}}>
                      <ActivityIndicator style={{ color: "yellow" }} />
                    </View>
                  </>
                ) : (
                  <View
                    style={{
                      height: "auto",
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 2,
                      borderColor: colors.lightBg,
                      padding: 20,
                      borderRadius: 50,
                    }}
                  >
                    <MaterialIcons
                      name="photo-camera"
                      size={50}
                      color={colors.lightGray}
                    />
                    {error && <Text style={{ color: "red" }}>{error}</Text>}
                  </View>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <View style={{ height: 80 }}>
              {imageURL?.length && (
                <Image
                  style={{ height: 60, width: 60, borderRadius: 50 }}
                  source={{ uri: imageURL?.[imageURL.length - 1] }}
                />
              )}
            </View>
          )}
        </View>

        <InputField
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
        <View
          style={{
            marginVertical: 15,
          }}
        >
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 14,
              lineHeight: 20,
              marginBottom: 10,
              marginHorizontal: 20,
              color: colors.white,
            }}
          >
            By signing up you agree to our{" "}
            <Text style={{ fontSize: 16, color: colors.white }}>
              Terms & Conditions
            </Text>{" "}
            and{" "}
            <Text style={{ fontSize: 16, color: colors.white }}>
              Privacy Policy.*
            </Text>
          </Text>
        </View>

        <CustomButton
          text="Signup"
          loading={loading || imgLoading}
          disabled={loading || imgLoading}
          onPress={onSignup}
          type="primary"
          style={{ alignSelf: "center" }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "SemiBold",
              color: colors.white,
            }}
          >
            Already signed up ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate(NavStr.LOGIN)}>
            <Text
              style={{
                fontFamily: "SemiBold",
                color: colors.primary,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SubContainer>
  );
};

export default Signup;
