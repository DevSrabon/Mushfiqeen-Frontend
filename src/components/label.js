import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Label = (props) => {
  return (
    <View
      style={{
        alignSelf: "flex-start",
        marginLeft: 18,
      }}
    >
      <Text style={{ ...styles.typography, ...props.style }}>
        {props.children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  typography: {
    fontFamily: "SemiBold",
    fontSize: 14,
  },
});

export default Label;
