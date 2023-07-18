import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "../theme/Colors";

const Title = (props) => {
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
    fontFamily: "Medium",
    fontSize: 14,
    color: colors.white,
  },
});

export default Title;
