import { StyleSheet, View } from "react-native";
import React from "react";
import colors from "../theme/Colors";

const HorizantalBar = (props) => {
  return (
    <View style={{ ...styles.row, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  row: {
    alignSelf: "center",
    borderBottomColor: colors.secondary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "95%",
  },
});

export default HorizantalBar;
