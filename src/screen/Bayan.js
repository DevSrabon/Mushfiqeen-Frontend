import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BayanCard, SubContainer } from "../components";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";
import { FlatList } from "react-native-gesture-handler";

const Bayan = () => {
  const navigation = useNavigation();
  const [lang, setLang] = useState("BN");
  const { userData } = useAuth();

  const [data, setData] = useState([]);

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
  }, [lang]);
  return (
    <SubContainer>
      <Pressable
        style={{ marginBottom: 10 }}
        onPress={() => navigation.navigate("bayanPost")}
      >
        <Text style={styles.postButton}>Post Bayan</Text>
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable onPress={() => setLang("BN")}>
          <Text style={styles.button}>বাংলা</Text>
        </Pressable>
        <Pressable onPress={() => setLang("EN")}>
          <Text style={styles.button}>English</Text>
        </Pressable>
        <Pressable onPress={() => setLang("FR")}>
          <Text style={styles.button}>Français</Text>
        </Pressable>
        <Pressable onPress={() => setLang("UR")}>
          <Text style={styles.button}>اردو</Text>
        </Pressable>
        <Pressable onPress={() => setLang("AR")}>
          <Text style={styles.button}>عربي</Text>
        </Pressable>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <BayanCard item={item} />}
        keyExtractor={(item) => item._id}
      />
    </SubContainer>
  );
};

const styles = StyleSheet.create({
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
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
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
