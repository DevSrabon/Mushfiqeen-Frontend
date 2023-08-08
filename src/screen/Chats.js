import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import NavStr from "../Nav/NavStr";
import { Protect } from "../Nav/ProtectedRoute";
import { SubContainer } from "../components";
import Header from "../components/header";
import { useAuth } from "../contexts/useAuth";
import { db } from "../firebase/firebaseConfig";
const Chats = () => {
  const navigation = useNavigation();
  const { userData } = useAuth();
  const [chats, setChats] = useState([]);

  const uid = userData?.data?._id;

  useEffect(() => {
    if (uid) {
      const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
        // console.log("Current data: ", doc.data());
        const data = doc.data();
        setChats(Object.entries(data));
      });
      return () => unsub();
    }
  }, [uid]);

  const onChat = useCallback(async () => {
    const chatRef = doc(db, "chats", combinedId);
    const chatRes = await getDoc(chatRef);
    if (!chatRes.exists()) {
      await setDoc(chatRef, { messages: [] });
    }
    navigation.navigate(NavStr.CHAT);
  }, []);

  return (
    <SubContainer style={{ paddingTop: 20, paddingHorizontal: 20 }}>
      <Header>Chat</Header>
      {chats
        ?.sort((a, b) => b[1].date - a[1].date)
        ?.map((chat) => (
          <Pressable key={chat?.[0]} style={styles.chats} onPress={onChat}>
            <Image
              source={{ uri: chat?.[1]?.userInfo?.photoURL }}
              style={styles.img}
            />
            <View>
              <Text style={styles.text}>{chat?.[1]?.userInfo?.name}</Text>
              <Text style={styles.text}>Last Message</Text>
            </View>
          </Pressable>
        ))}
    </SubContainer>
  );
};

export default Protect(Chats);
const styles = StyleSheet.create({
  chats: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  img: { height: 50, width: 50, borderRadius: 50 },

  text: {
    color: "white",
  },
  font: {
    fontSize: 20,
  },
});
