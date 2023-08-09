import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, StatusBar } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { BayanCard, Row, SubContainer } from "../components";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";
import NavStr from "../Nav/NavStr";
import { AntDesign } from "@expo/vector-icons";

const Bayan = (props) => {
  const { navigation } = props;
  const [lang, setLang] = useState("BN");
  const { userData, bayanRefetch } = useAuth();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${userData?.accessToken}`,
    },
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://musfiqeen-backend.vercel.app/api/v1/bayans/get/${lang}`,
        config
      );
      setData(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [lang, bayanRefetch]);
  return (
    <SubContainer>
      <Row style={{ paddingVertical: 0, marginTop: StatusBar.currentHeight }}>
        <AntDesign
          name="arrowleft"
          size={30}
          color={colors.white}
          onPress={() => navigation.goBack()}
        />
        {userData?.data?.status === "author" && (
          <Pressable
            style={{ marginBottom: 10 }}
            onPress={() => navigation.navigate(NavStr.BAYAN_POST)}
          >
            <Text style={styles.buttonPost}>Post Bayan</Text>
          </Pressable>
        )}
      </Row>

      <View
        style={{
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable onPress={() => setLang("BN")}>
          <Text style={[styles.button, lang === "BN" && styles.focus]}>
            বাংলা
          </Text>
        </Pressable>
        <Pressable onPress={() => setLang("EN")}>
          <Text style={[styles.button, lang === "EN" && styles.focus]}>
            English
          </Text>
        </Pressable>
        <Pressable onPress={() => setLang("FR")}>
          <Text style={[styles.button, lang === "FR" && styles.focus]}>
            Français
          </Text>
        </Pressable>
        <Pressable onPress={() => setLang("UR")}>
          <Text style={[styles.button, lang === "UR" && styles.focus]}>
            اردو
          </Text>
        </Pressable>
        <Pressable onPress={() => setLang("AR")}>
          <Text style={[styles.button, lang === "AR" && styles.focus]}>
            عربي
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <BayanCard item={item} config={config} />}
        keyExtractor={(item) => item._id}
      />
    </SubContainer>
  );
};

const styles = StyleSheet.create({
  buttonPost: {
    fontFamily: "SemiBold",
    fontSize: 20,
    color: colors.primary,
    alignSelf: "flex-end",
  },
  btnContainer: {
    minWidth: 100,
  },
  button: {
    fontFamily: "SemiBold",
    fontSize: 16,
    color: colors.white,
    alignSelf: "center",
    paddingVertical: 5,
    borderColor: colors.primary,
    borderWidth: 0.6,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  focus: {
    backgroundColor: "rgba(220, 250, 0, .1)",
  },
  postButton: {
    fontFamily: "SemiBold",
    fontSize: 20,
    color: colors.white,
    alignSelf: "flex-end",
    marginRight: 20,
    paddingVertical: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
  },
});

export default Bayan;
