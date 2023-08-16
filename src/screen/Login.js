import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NavStr from "../Nav/NavStr";
import CustomButton from "../components/customButton";
import Header from "../components/header";
import InputField from "../components/inpuField";
import Row from "../components/row";
import SubContainer from "../components/subContainer";
import Title from "../components/title";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";

const Login = () => {
  const { userData, setToken, loading, setLoading, token } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
    message: "",
  });
  const navigation = useNavigation();
  const router = useRoute();

  const onSignInPressed = async () => {
    setLoading(true);
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
    } catch (error) {
      console.log(error.response.data);
      if (error.response && error.response.data && error.response.data.error) {
        const backendError = error.response.data.error;

        const errorState = {};

        if (backendError?.toLowerCase().includes("password")) {
          errorState.password = backendError;
        } else if (backendError?.toLowerCase().includes("email")) {
          errorState.email = backendError;
        } else {
          errorState.message = backendError;
        }

        setError(errorState);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.data && userData?.data?.status !== "inactive") {
      // navigation.navigate(router?.params?.from || NavStr.HOME);
      navigation.navigate(NavStr.HOME);
    } else if (userData?.data?.status === "inactive") {
      navigation.navigate(NavStr.VERIFYCODE);
    }
  }, [navigation, userData?.data?.status, token]);

  return (
    <SubContainer>
      <Row style={{ paddingTop: StatusBar.currentHeight }}>
        <AntDesign
          name="arrowleft"
          size={30}
          color={colors.secondary}
          onPress={() => navigation.navigate(NavStr.HOME)}
        />
        <Header>Login</Header>
      </Row>

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
      {error?.message && (
        <Text
          style={{ color: "red", alignSelf: "flex-start", paddingLeft: 20 }}
        >
          {error?.message}
        </Text>
      )}

      <CustomButton
        text="Login"
        onPress={onSignInPressed}
        type="primary"
        loading={loading}
        disabled={loading || !email || !password}
        style={{ alignSelf: "center", marginTop: 30 }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(NavStr.FORGET, { email })}
        style={{ alignItems: "flex-end" }}
      >
        <Title
          style={{
            marginRight: 20,
            marginTop: 5,
          }}
        >
          Forget Password?
        </Title>
      </TouchableOpacity>

      <View style={styles.signup}>
        <Text
          style={{
            fontFamily: "SemiBold",
            color: colors.secondary,
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

const styles = StyleSheet.create({
  signup: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 3,
    marginTop: 20,
  },
});

export default Login;
