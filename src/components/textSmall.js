import React from "react";
import { StyleSheet, Text, View } from "react-native";
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

export default React.memo(TextSmall);
