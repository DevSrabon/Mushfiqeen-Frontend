import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { Text, TouchableOpacity, View } from "react-native";
import NavStr from "../Nav/NavStr";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "../components/customButton";
import Header from "../components/header";
import InputField from "../components/inpuField";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";
import SubContainer from "../components/subContainer";

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
      navigation.navigate(NavStr.PARENT);
    } else if (userData?.data?.status === "inactive") {
      navigation.navigate(NavStr.VERIFYCODE);
    }
  }, [navigation, userData?.data?.role]);

  return (
    <SubContainer>
      <AntDesign
        name="arrowleft"
        size={30}
        color={colors.white}
        onPress={() => navigation.navigate(NavStr.HOME)}
        style={{ paddingHorizontal: 10, paddingTop: 10 }}
      />
      <Header>Login</Header>

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
        style={{ alignSelf: "center", marginTop: 30 }}
      />

      {/* <View style={{ flex: 1, gap: 10, marginTop: 20 }}></View> */}
      <View style={{ width: "100%", alignItems: "flex-end" }}>
        <TouchableOpacity onPress={() => navigation.navigate(NavStr.FORGET)}>
          <Text
            style={{
              fontFamily: "SemiBold",
              color: colors.white,
              textAlign: "right",
              marginRight: 20,
              marginTop: 10,
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
            color: colors.white,
          }}
        >
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate(NavStr.SIGNUP)}>
          <Text
            style={{
              fontFamily: "SemiBold",
              color: colors.primary,
            }}
          >
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    </SubContainer>
  );
};

export default Login;
