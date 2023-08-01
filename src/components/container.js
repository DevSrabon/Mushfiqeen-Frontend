import React from "react";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";

const Container = (props) => {
  return (
    <SafeAreaView style={{ ...styles.container, ...props.style }}>
      {props.children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    // marginTop: StatusBar.currentHeight,
    backgroundColor: "#000000",
  },
});

export default Container;
