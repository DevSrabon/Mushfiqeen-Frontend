import { View } from "react-native";
import React from "react";
import colors from "../theme/Colors";

const Line = () => {
  return (
    <View
      style={{
        alignSelf: "center",
        borderBottomColor: colors.white,
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: "90%",
        marginVertical: 5,
      }}
    ></View>
  );
};

export default Line;
