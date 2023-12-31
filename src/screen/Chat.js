import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as Crypto from "expo-crypto";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { StatusBar, StyleSheet, View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { Row, SubContainer } from "../components";
import Messages from "../components/Chats/messages";
import Input from "../components/TextInput";
import Header from "../components/header";
import { useAuth } from "../contexts/useAuth";
import { db } from "../firebase/firebaseConfig";
import colors from "../theme/Colors";

const Chat = ({ navigation, route }) => {
  const { combinedId, chatId } = route.params;
  const [loading, setLoading] = useState(false);
  const { userData } = useAuth();
  const [texts, setTexts] = useState("");
  const [messages, setMessages] = useState([]);

  const [sound, setSound] = useState();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/clickPlay.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);
  const chatRef = doc(db, "chats", combinedId);

  const onSend = useCallback(async () => {
    setLoading(true);
    const uuid = Crypto.randomUUID();
    try {
      await updateDoc(chatRef, {
        messages: arrayUnion({
          id: uuid,
          texts,
          name: userData?.data?.fullName,
          senderId: userData?.data?._id,
          photoURL: userData?.data?.imageURL,
          date: Timestamp.now(),
        }),
      });
      playSound();
      await updateDoc(doc(db, "users", userData?.data?._id), {
        [combinedId + ".lastMessage"]: { texts },
        [combinedId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "users", chatId?.userInfo.uid), {
        [combinedId + ".lastMessage"]: { texts },
        [combinedId + ".date"]: serverTimestamp(),
      });

      setTexts("");
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, [chatRef, combinedId, texts, userData, chatId?.userInfo.uid]);

  useEffect(() => {
    if (combinedId) {
      const unsub = onSnapshot(chatRef, (doc) => {
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
    <SubContainer>
      <Row style={{ paddingTop: StatusBar.currentHeight }}>
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
        <Input
          placeholder="Leave Your Message !"
          value={texts}
          image={userData?.data?.imageURL}
          onChangeText={setTexts}
          onPress={onSend}
          loading={loading}
        />
      </View>
    </SubContainer>
  );
};

export default Chat;

const styles = StyleSheet.create({
  inputContainer: {
    position: "absolute",
    bottom: 2,
    left: 2,
    right: 0,
    width: "100%",
  },
  userImg: {
    height: 35,
    width: 35,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
});
