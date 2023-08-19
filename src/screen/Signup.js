import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NavStr from "../Nav/NavStr";
import { Loading } from "../components";
import CustomButton from "../components/customButton";
import Header from "../components/header";
import InputField from "../components/inpuField";
import Row from "../components/row";
import SubContainer from "../components/subContainer";
import Title from "../components/title";
import { useAuth } from "../contexts/useAuth";
import useImagePicker from "../hooks/useImagePicker";
import colors from "../theme/Colors";

const Signup = () => {
  const { loading, setLoading, setToken } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    image: "",
    email: "",
    password: "",
    fullName: "",
    designation: "",
    message: "",
  });

  const fullName = firstName + " " + lastName;

  const { imageURL, loading: imgLoading, takePhoto } = useImagePicker();

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://musfiqeen-backend.vercel.app//api/v1/users/signup",
        {
          email,
          password: password.trim().toLowerCase(),
          confirmPassword: password,
          fullName,
          imageURL: imageURL,
          designation,
        }
      );

      if (response.status === 200) {
        navigation.navigate(NavStr.VERIFYCODE, (state = { email }));
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.data.error.includes("duplicate")) {
          return setError((prev) => ({
            ...prev,
            email: "Email already in used.",
          }));
        }
        const backendErrors = error.response.data.error;
        const errorState = backendErrors.reduce((acc, errorMessage) => {
          if (errorMessage.includes("Image")) {
            acc.image = errorMessage;
          } else if (errorMessage?.toLowerCase().includes("email")) {
            acc.email = errorMessage;
          } else if (errorMessage?.toLowerCase().includes("password")) {
            acc.password = errorMessage;
          } else if (errorMessage?.toLowerCase().includes("name")) {
            acc.fullName = errorMessage;
          } else if (errorMessage?.toLowerCase().includes("designation")) {
            acc.designation = errorMessage;
          } else {
            acc.message = errorMessage;
          }
          return acc;
        }, {});
        setError(errorState);
      }
    } finally {
      setLoading(false);
    }
  };

  if (imgLoading) return <Loading />;
  return (
    <SubContainer>
      <Row style={{ paddingTop: StatusBar.currentHeight }}>
        <AntDesign
          name="arrowleft"
          size={30}
          color={colors.secondary}
          onPress={() => navigation.navigate(NavStr.HOME)}
        />
        <Header>Signup</Header>
      </Row>

      <ScrollView>
        <View style={{ alignItems: "center" }}>
          {!imageURL ? (
            <>
              <TouchableOpacity
                onPress={takePhoto}
                style={{ borderColor: "red" }}
              >
                {loading ? (
                  <>
                    <View>
                      <ActivityIndicator style={{ color: "yellow" }} />
                    </View>
                  </>
                ) : (
                  <>
                    <View
                      style={{
                        height: "auto",
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 2,
                        borderColor: colors.primary,
                        padding: 20,
                        borderRadius: 50,
                      }}
                    >
                      <MaterialIcons
                        name="photo-camera"
                        size={50}
                        color={colors.lightGray}
                      />
                    </View>
                    {error?.image && (
                      <Text style={{ color: "red" }}>{error?.image}</Text>
                    )}
                  </>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <View style={{ height: 80 }}>
              {imageURL?.length && (
                <Image
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: colors.primary,
                  }}
                  source={{ uri: imageURL }}
                />
              )}
            </View>
          )}
        </View>

        <InputField
          placeholder="Your First Name"
          value={firstName}
          setValue={setFirstName}
          error={error.fullName}
        />

        <InputField
          placeholder="Your Last Name"
          value={lastName}
          setValue={setLastName}
          error={error.fullName}
        />
        <InputField
          placeholder="Designation"
          value={designation}
          setValue={setDesignation}
          error={error.designation}
        />
        <InputField
          placeholder="Your Email"
          value={email}
          setValue={setEmail}
          keyboardType="email-address"
          error={error.email}
          autoCapitalize="none"
        />

        <InputField
          placeholder="Your Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          error={error.password}
          autoCapitalize="none"
        />
        {error?.message && (
          <Text
            style={{ color: "red", alignSelf: "flex-start", paddingLeft: 20 }}
          >
            {error?.message}
          </Text>
        )}
        <View
          style={{
            marginVertical: 15,
          }}
        >
          <Title
            style={{
              lineHeight: 20,
              marginBottom: 10,
              marginHorizontal: 20,
            }}
          >
            By signing up you agree to our{" "}
            <Text style={{ fontSize: 16, color: colors.secondary }}>
              Terms & Conditions
            </Text>{" "}
            and{" "}
            <Text style={{ fontSize: 16, color: colors.white }}>
              Privacy Policy.*
            </Text>
          </Title>
        </View>

        <CustomButton
          text="Signup"
          loading={loading || imgLoading}
          disabled={
            loading ||
            imgLoading ||
            !fullName ||
            !email ||
            !password ||
            !designation ||
            !imageURL
          }
          onPress={onSignup}
          type="primary"
          style={{ alignSelf: "center" }}
        />
        <Row
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            marginTop: 10,
          }}
        >
          <Title>Already signed up ?</Title>
          <TouchableOpacity onPress={() => navigation.navigate(NavStr.LOGIN)}>
            <Title
              style={{
                color: colors.primary,
              }}
            >
              Login
            </Title>
          </TouchableOpacity>
        </Row>
      </ScrollView>
    </SubContainer>
  );
};

export default Signup;
