import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../theme/Colors";

const NormalText = (props) => {
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
    fontFamily: "Regular",
    fontSize: 13,
    color: colors.white,
    letterSpacing: 0.1,
  },
});

export default React.memo(NormalText);
