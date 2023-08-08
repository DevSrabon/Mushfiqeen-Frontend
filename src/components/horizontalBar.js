import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../theme/Colors";

const HorizantalBar = (props) => {
  return (
    <View style={{ ...styles.row, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  row: {
    alignSelf: "center",
    borderBottomColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "95%",
  },
});

export default React.memo(HorizantalBar);
