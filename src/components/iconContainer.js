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
import { Pressable, View, StyleSheet } from "react-native";
import NavStr from "../Nav/NavStr";
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
      const userRef2 = doc(db, "users", oid);
      const res = await getDoc(userRef);
      const res2 = await getDoc(userRef2);

      const data = {
        [combinedId + ".userInfo"]: {
          uid: oid,
          name: post?.user?.fullName,
          photoURL: post?.user?.imageURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      };

      const data2 = {
        [combinedId + ".userInfo"]: {
          uid,
          name: userData?.data?.fullName,
          photoURL: userData?.data?.imageURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      };

      if (!res.exists()) {
        await setDoc(userRef, {});
      }

      if (!res2.exists()) {
        await setDoc(userRef2, {});
      }

      await updateDoc(userRef, data);
      await updateDoc(userRef2, data2);

      navigation.navigate(NavStr.CHATS);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  }, [combinedId, navigation, oid, post, uid, userData?.data]);

  return (
    <View style={styles.container}>
      <Pressable style={{ alignItems: "center" }} onPress={() => onLikes()}>
        {isLiked ? (
          <AntDesign name={"like1"} size={18} color={colors.primary} />
        ) : (
          <AntDesign name={"like2"} size={18} color={colors.primaryLight} />
        )}
        <TextSmall>{isLiked ? "Liked" : "Like"}</TextSmall>
      </Pressable>

      <Pressable style={{ alignItems: "center" }} onPress={onNavigate}>
        <FontAwesome5
          name="comment-dots"
          size={18}
          color={colors.primaryLight}
        />
        <TextSmall style={{ color: colors.primaryLight }}>Comment</TextSmall>
      </Pressable>

      <Pressable style={{ alignItems: "center" }}>
        <FontAwesome5
          name="share-square"
          size={18}
          color={colors.primaryLight}
        />
        <TextSmall style={{ color: colors.primaryLight }}>Share</TextSmall>
      </Pressable>

      <Pressable style={{ alignItems: "center" }} onPress={onSendMessage}>
        <FontAwesome name="send" size={18} color={colors.primaryLight} />
        <TextSmall style={{ color: colors.primaryLight }}>Send</TextSmall>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 30,
  },
});

export default React.memo(IconContainer);
