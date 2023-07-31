import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable, View } from "react-native";

import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";
import TextSmall from "./textSmall";

const IconContainer = ({ onLikes, userData, post }) => {
  console.log("🚀 ~ file: iconContainer.js:10 ~ IconContainer ~ post:", post);
  const navigation = useNavigation();
  const { setPostId } = useAuth();

  const isLiked = post?.likers?.includes(userData?.data?._id);

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

      <Pressable style={{ alignItems: "center" }}>
        <FontAwesome name="send" size={18} color={colors.white} />
        <TextSmall>Send</TextSmall>
      </Pressable>
    </View>
  );
};

export default IconContainer;
