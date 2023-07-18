import { StyleSheet, View } from "react-native";
import React from "react";

const Row = (props) => {
  return (
    <View style={{ ...styles.row, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});

export default Row;
