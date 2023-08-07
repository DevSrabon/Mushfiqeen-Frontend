import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import NavStr from "../Nav/NavStr";
import colors from "../theme/Colors";

const Reactions = ({ post }) => {
  const navigation = useNavigation();
  const likersArr = post?.likers;
  return (
    <>
      <View style={styles.container}>
        {likersArr
          ?.slice(0)
          .reverse()
          .slice(0, 5)
          ?.map((img, i) => (
            <Pressable key={i} style={{ alignItems: "center" }}>
              <Image
                source={{ uri: img?.imageURL }}
                resizeMode="cover"
                style={styles.userImg}
              />
              <View style={styles.iconBox}>
                <AntDesign
                  name="like1"
                  size={12}
                  color={colors.white}
                  style={styles.icon}
                />
              </View>
            </Pressable>
          ))}

        <Pressable
          onPress={() =>
            navigation.navigate(NavStr.REACTION, (state = { likersArr }))
          }
        >
          <View style={styles.threeDots}>
            <Entypo
              name="dots-three-horizontal"
              size={24}
              color={colors.white}
            />
          </View>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
  threeDots: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 35,
    borderRadius: 50,
    borderColor: colors.white,
    borderWidth: 1,
  },
  userImg: {
    height: 35,
    width: 35,
    borderRadius: 50,
    alignSelf: "center",
  },
  icon: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 25,
    padding: 1,
  },
  iconBox: {
    position: "absolute",
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 25,
    top: 20,
    left: 25,
  },
});

export default Reactions;
