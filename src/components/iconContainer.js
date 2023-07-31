import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { get, getDatabase, push, ref } from "firebase/database";
import { Pressable, View } from "react-native";

import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";
import TextSmall from "./textSmall";

const IconContainer = ({ onLikes, userData, post }) => {
  const navigation = useNavigation();
  const { setPostId } = useAuth();

  const isLiked = post?.likers?.includes(userData?.data?._id);
  const onMessage = () => {
    const createChatId = (email1, email2) => {
      return [email1, email2].sort().join();
    };

    const chatRef = ref(getDatabase(), post?.user?.email?.replace(/[@.]/g, ""));
    const newMessage = {
      mail: userData?.data?.email,
      name: userData?.data?.fullName,
      profileImage: userData?.data?.imageURL,
      chatid: createChatId(post?.user?.email, userData?.data?.email),
    };
    console.log({ newMessage });
    get(chatRef).then((snapshot) => {
      const emails = Object.values(snapshot.val() || {}).map(
        (message) => message.mail
      );
      if (!emails.includes(post?.user?.email)) {
        // Email doesn't exist, push the new message
        push(chatRef, newMessage);
      }
    });
    const chatRef1 = ref(
      getDatabase(),
      userData?.data?.email.replace(/[@.]/g, "")
    );
    const newMessage1 = {
      mail: post?.user?.email,
      name: post?.user?.userName,
      profileImage: post?.user?.photo,
      chatid: createChatId(post?.user?.email, userData?.data?.email),
    };
    console.log({ newMessage1 });
    get(chatRef1).then((snapshot) => {
      const emails = Object.values(snapshot.val() || {}).map(
        (message) => message.mail
      );
      if (!emails?.includes(userData?.data?.email)) {
        // Email doesn't exist, push the new message
        push(chatRef1, newMessage1);
      }
    });
  };
  // const liked = useSharedValue(0);
  // const outlineStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
  //       },
  //     ],
  //   };
  // });

  // const fillStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         scale: liked.value,
  //       },
  //     ],
  //   };
  // });
  const onNavigate = () => {
    setPostId(post);
    navigation.navigate("postDetails");
  };
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

      <Pressable style={{ alignItems: "center" }} onPress={() => onNavigate()}>
        <FontAwesome5 name="comment-dots" size={18} color={colors.white} />
        <TextSmall>Comment</TextSmall>
      </Pressable>

      <Pressable style={{ alignItems: "center" }}>
        <FontAwesome5 name="share-square" size={18} color={colors.white} />
        <TextSmall>Share</TextSmall>
      </Pressable>

      <Pressable style={{ alignItems: "center" }} onPress={onMessage}>
        <FontAwesome name="send" size={18} color={colors.white} />
        <TextSmall>Send</TextSmall>
      </Pressable>
    </View>
  );
};

export default IconContainer;
