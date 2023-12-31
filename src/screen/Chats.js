import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import NavStr from "../Nav/NavStr";
import { Protect } from "../Nav/ProtectedRoute";
import { SubContainer, TextSmall, Title } from "../components";
import Header from "../components/header";
import Row from "../components/row";
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
        doc.exists() && setChats(Object.entries(data));
      });
      return () => unsub();
    }
  }, [uid]);

  const onChat = useCallback(
    async (combinedId, chatId) => {
      const chatRef = doc(db, "chats", combinedId);
      const chatRes = await getDoc(chatRef);
      if (!chatRes.exists()) {
        await setDoc(chatRef, { messages: [] });
      }
      navigation.navigate(NavStr.CHAT, { combinedId, chatId });
    },
    [navigation]
  );

  return (
    <SubContainer>
      <Row style={{ paddingTop: StatusBar.currentHeight }}>
        <Header>Chat</Header>
      </Row>
      <ScrollView style={{ paddingHorizontal: 10 }}>
        {chats
          ?.sort((a, b) => b[1].date - a[1].date)
          ?.map((chat, i) => (
            <Pressable
              key={i}
              style={styles.chats}
              onPress={() => onChat(chat?.[0], chat?.[1])}
            >
              <Image
                source={{ uri: chat?.[1]?.userInfo?.photoURL }}
                style={styles.img}
              />
              <View>
                <Title>{chat?.[1]?.userInfo?.name}</Title>
                <TextSmall>{chat?.[1]?.lastMessage?.texts}</TextSmall>
              </View>
            </Pressable>
          ))}
      </ScrollView>
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
