import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Protect } from "../Nav/ProtectedRoute";
import { SubContainer } from "../components";
import { useAuth } from "../contexts/useAuth";
import { db } from "../firebase/firebaseConfig";
const Chat = () => {
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
  return (
    <SubContainer style={{ paddingTop: 20, paddingHorizontal: 20 }}>
      <Text style={[styles.text, styles.font]}>Chat</Text>
      {chats
        ?.sort((a, b) => b[1].date - a[1].date)
        ?.map((chat) => (
          <View key={chat?.[0]} style={styles.chats}>
            <Image
              source={{ uri: chat?.[1]?.userInfo?.photoURL }}
              style={styles.img}
            />
            <View>
              <Text style={styles.text}>{chat?.[1]?.userInfo?.name}</Text>
              <Text style={styles.text}>Last Message</Text>
            </View>
          </View>
        ))}
    </SubContainer>
  );
};

export default Protect(Chat);
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
