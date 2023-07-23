import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable, View, TouchableOpacity } from "react-native";
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import colors from "../theme/Colors";
import TextSmall from "./textSmall";

const IconContainer = ({ onLikes, userData, post }) => {
  const navigation = useNavigation();

  const isLiked = post?.likers?.includes(userData?.data?._id);

  const liked = useSharedValue(0);
  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
        },
      ],
    };
  });

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: liked.value,
        },
      ],
    };
  });

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
        <TextSmall>Like</TextSmall>
      </Pressable>

      <Pressable
        style={{ alignItems: "center" }}
        onPress={() =>
          navigation.navigate("postDetails", { post, isLiked, userData })
        }
      >
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
