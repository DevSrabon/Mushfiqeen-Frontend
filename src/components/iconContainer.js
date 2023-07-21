import { View, Pressable,StyleSheet } from "react-native";
import { AntDesign, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import TextSmall from "./textSmall";
import colors from "../theme/Colors";
import { useNavigation } from "@react-navigation/native";
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue ,withSpring} from "react-native-reanimated";

const IconContainer = () => {
  const navigation = useNavigation();

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
      <Pressable onPress={() => (liked.value = withSpring(liked.value ? 0 : 1))} style={{ alignItems: "center" }}>
      <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>

        <AntDesign
          name={"like2"}
          size={18}
          color={colors.white}
        />
      </Animated.View>
      <Animated.View style={fillStyle}>
        <AntDesign
          name={"like1"}
          size={18}
          color={colors.primary}
        />
      </Animated.View>
        <TextSmall>Like</TextSmall>
      </Pressable>

      <Pressable
        style={{ alignItems: "center" }}
        onPress={() => navigation.navigate("postDetails")}
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
