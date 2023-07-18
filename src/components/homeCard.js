import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import colors from "../theme/Colors";
import icons from "../../assets/icons";

const HomeCard = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image source={icons.user} resizeMode="cover" style={styles.userImg} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    width: "100%",
    height: 400,
  },
  userImg: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});

export default HomeCard;
