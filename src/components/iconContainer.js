import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useCallback, useMemo } from "react";
import { Pressable, View } from "react-native";
import NavStr from "../Nav/NavStr";
import { useAuth } from "../contexts/useAuth";
import { db } from "../firebase/firebaseConfig";
import colors from "../theme/Colors";
import TextSmall from "./textSmall";

const IconContainer = ({ onLikes, userData, post }) => {
  const navigation = useNavigation();

  const isLiked = useMemo(() => {
    return (
      post?.likers?.includes(userData?.data?._id) ||
      post?.likers?.some((item) => item?._id === userData?.data?._id)
    );
  }, [post?.likers, userData?.data?._id]);

  const onNavigate = useCallback(() => {
    navigation.navigate(NavStr.POSTDETAILS, { post });
  }, [navigation, post]);

  const uid = userData?.data?._id;
  const oid = post?.user?._id;
  const combinedId = useMemo(() => {
    return uid > oid ? uid + oid : oid + uid;
  }, [uid, oid]);

  const onSendMessage = useCallback(async () => {
    try {
      const userRef = doc(db, "users", uid);
      const res = await getDoc(userRef);
      const data = {
        [combinedId + ".userInfo"]: {
          uid: oid,
          name: post?.user?.fullName,
          photoURL: post?.user?.imageURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      };
      if (!res.exists()) {
        await setDoc(userRef, {});
        await updateDoc(userRef, data);
        navigation.navigate(NavStr.CHAT);
      } else {
        await updateDoc(userRef, data);
        navigation.navigate(NavStr.CHAT);
      }
      const chatRef = doc(db, "chats", combinedId);
      const chatRes = await getDoc(chatRef);
      if (!chatRes.exists()) {
        await setDoc(chatRef, { messages: [] });
      }
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  }, [combinedId, navigation, oid, post, uid]);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        paddingHorizontal: 30,
      }}
    >
      <Pressable style={{ alignItems: "center" }} onPress={() => onLikes()}>
        {isLiked ? (
          <AntDesign name={"like1"} size={18} color={colors.primary} />
        ) : (
          <AntDesign name={"like2"} size={18} color={colors.white} />
        )}
        <TextSmall>{isLiked ? "Liked" : "Like"}</TextSmall>
      </Pressable>

      <Pressable style={{ alignItems: "center" }} onPress={onNavigate}>
        <FontAwesome5 name="comment-dots" size={18} color={colors.white} />
        <TextSmall>Comment</TextSmall>
      </Pressable>

      <Pressable style={{ alignItems: "center" }}>
        <FontAwesome5 name="share-square" size={18} color={colors.white} />
        <TextSmall>Share</TextSmall>
      </Pressable>

      <Pressable style={{ alignItems: "center" }} onPress={onSendMessage}>
        <FontAwesome name="send" size={18} color={colors.white} />
        <TextSmall>Send</TextSmall>
      </Pressable>
    </View>
  );
};

export default React.memo(IconContainer);
