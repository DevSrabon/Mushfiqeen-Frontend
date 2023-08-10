import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Crypto from "expo-crypto";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Row, SubContainer } from "../components";
import Header from "../components/header";
import Messages from "../components/messages";
import { useAuth } from "../contexts/useAuth";
import { db } from "../firebase/firebaseConfig";
import colors from "../theme/Colors";
const Chat = ({ navigation, route }) => {
  const { combinedId, chatId } = route.params;
  console.log("🚀 ~ file: Chat.js:22 ~ Chat ~ chatId:", chatId?.userInfo.uid);

  const { userData } = useAuth();
  const [texts, setTexts] = useState("");
  const [messages, setMessages] = useState([]);

  const chatRef = doc(db, "chats", combinedId);

  const onSend = async () => {
    const uuid = Crypto.randomUUID();
    try {
      await updateDoc(chatRef, {
        messages: arrayUnion({
          id: uuid,
          texts,
          senderId: userData?.data?._id,
          photoURL: userData?.data?.imageURL,
          date: Timestamp.now(),
        }),
      });
      await updateDoc(doc(db, "users", userData?.data?._id), {
        [combinedId + ".lastMessage"]: {texts},

        [combinedId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "users", chatId?.userInfo.uid), {
        [combinedId + ".lastMessage"]: {texts},

        [combinedId + ".date"]: serverTimestamp(),
      });

      setTexts("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (combinedId) {
      const unsub = onSnapshot(chatRef, (doc) => {
        // console.log("Current data: ", doc.data());
        const data = doc.data();
        doc.exists() && setMessages(data?.messages);
      });
      return () => unsub();
    }
  }, [combinedId]);
  const scrollViewRef = useRef(null);
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);
  return (
    <SubContainer style={{ paddingTop: 20, paddingHorizontal: 10 }}>
      <Row>
        <AntDesign
          name="arrowleft"
          size={30}
          color={colors.white}
          onPress={() => navigation.goBack()}
        />
        <Header>{chatId?.userInfo?.name}</Header>
      </Row>
      <ScrollView
        ref={scrollViewRef}
        style={{
          marginBottom: 60,
        }}
      >
        {messages?.map((m) => (
          <Messages key={m?.id} m={m} userData={userData} />
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <Row style={{ gap: 5 }}>
          <Image
            source={{ uri: userData?.data?.imageURL }}
            style={styles.userImg}
          />
          <ScrollView>
            <TextInput
              placeholder="Leave Your Message !"
              placeholderTextColor={colors.lightGray}
              multiline={true}
              value={texts}
              selectionColor={colors.white}
              onChangeText={setTexts}
              style={styles.input}
            />
          </ScrollView>
          <Pressable onPress={onSend} disabled={!texts}>
            <MaterialCommunityIcons
              name="send"
              size={30}
              color={!texts ? colors.primaryLight : colors.primary}
            />
          </Pressable>
        </Row>
      </View>
    </SubContainer>
  );
};

export default Chat;

const styles = StyleSheet.create({
  inputContainer: {
    position: "absolute",
    bottom: 2,
    left: 8,
    right: 0,
    width: "100%",
  },
  userImg: {
    height: 35,
    width: 35,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  input: {
    backgroundColor: colors.bg,
    color: colors.white,
    fontSize: 18,
    borderColor: colors.lightBg,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
