import { useNavigation } from "@react-navigation/native";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useCallback, useMemo } from "react";
import NavStr from "../../Nav/NavStr";
import { useAuth } from "../../contexts/useAuth";
import { db } from "../../firebase/firebaseConfig";

const useCreateChat = (profile) => {
  const { userData } = useAuth();
  const navigation = useNavigation();

  const uid = userData?.data?._id;
  const oid = profile?._id;
  const combinedId = useMemo(() => {
    return uid > oid ? uid + oid : oid + uid;
  }, [uid, oid]);

  const sendMessage = useCallback(async () => {
    try {
      const userRef = doc(db, "users", uid);
      const userRef2 = doc(db, "users", oid);
      const res = await getDoc(userRef);
      const res2 = await getDoc(userRef2);

      const data = {
        [combinedId + ".userInfo"]: {
          uid: oid,
          name: profile.fullName,
          photoURL: profile.imageURL,
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
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  }, [combinedId, navigation, oid, profile, uid, userData?.data]);

  return sendMessage;
};

export default useCreateChat;
