import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import colors from "../theme/Colors";
import SubTitle from "./subTitle";

const Reactions = ({ post }) => {
  const imageArr = post?.likers;
  console.log(imageArr);
  return (
    <>
      <SubTitle style={{ marginLeft: 20 }}>Reactions</SubTitle>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          gap: 5,
          marginVertical: 10,
          paddingHorizontal: 20,
        }}
      >
        {imageArr
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

        {/* <Pressable style={{ alignItems: "center" }}>
          <Image
            source={icons.user}
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

        <Pressable style={{ alignItems: "center" }}>
          <Image
            source={icons.user}
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
        <Pressable style={{ alignItems: "center" }}>
          <Image
            source={icons.user}
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
        <Pressable style={{ alignItems: "center" }}>
          <Image
            source={icons.user}
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
        <Pressable style={{ alignItems: "center" }}>
          <Image
            source={icons.user}
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
        </Pressable> */}
        <Pressable
          style={{
            alignItems: "center",
            height: 40,
            width: 40,
            borderRadius: 50,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 35,
              width: 35,
              borderRadius: 50,
              borderColor: colors.white,
              borderWidth: 1,
              bottom: 10,
            }}
          >
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
    backgroundColor: colors.bg,
    width: "100%",
    // height: 400,
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
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 25,
    bottom: 15,
    left: 15,
  },
});

export default Reactions;
