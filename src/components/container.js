import { StyleSheet, SafeAreaView, StatusBar, Dimensions } from "react-native";
import React from "react";

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
