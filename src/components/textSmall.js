import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "../theme/Colors";

const TextSmall = (props) => {
  return (
    <View>
      <Text style={{ ...styles.typography, ...props.style }}>
        {props.children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  typography: {
    color: colors.white,
    fontFamily: "Medium",
    fontSize: 11,
  },
});

export default TextSmall;
