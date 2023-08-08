import React from "react";
import { StyleSheet, View } from "react-native";

const Row = (props) => {
  console.log("row");
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

export default React.memo(Row);
