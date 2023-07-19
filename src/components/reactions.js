import { View, Pressable, StyleSheet, Image } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import icons from "../../assets/icons";
import colors from "../theme/Colors";
import SubTitle from "./subTitle";
import { AntDesign } from "@expo/vector-icons";

const Reacttions = () => {
  return (
    <>
      <SubTitle style={{ marginLeft: 20 }}>Reactions</SubTitle>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 10,
          paddingHorizontal: 20,
        }}
      >
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

export default Reacttions;
