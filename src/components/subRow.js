import { StyleSheet, View } from "react-native";
import React from "react";

const SubRow = (props) => {
  return (
    <View style={{ ...styles.row, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default SubRow;
