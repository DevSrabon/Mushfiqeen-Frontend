import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../theme/Colors";

const SubTitle = (props) => {
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
    fontSize: 12,
    color: colors.white,
  },
});

export default SubTitle;
