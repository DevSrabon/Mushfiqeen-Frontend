import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  StyleSheet,
} from "react-native";
import NavStr from "../Nav/NavStr";
import CustomButton from "../components/customButton";
import Header from "../components/header";
import InputField from "../components/inpuField";
import SubContainer from "../components/subContainer";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";
import Row from "../components/row";
import Title from "../components/title";

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
        navigation.navigate(NavStr.VERIFYCODE, (state = { email }));
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

      <CustomButton
        text="Login"
        onPress={onSignInPressed}
        type="primary"
        loading={loading}
        disabled={loading}
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
