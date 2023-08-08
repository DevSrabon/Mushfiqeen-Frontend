import React from "react";
import { StyleSheet, Text, View } from "react-native";
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
    color: colors.secondary,
  },
});

export default React.memo(Title);
