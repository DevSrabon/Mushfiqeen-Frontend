import { StyleSheet, SafeAreaView, StatusBar, Dimensions } from "react-native";
import React from "react";
import colors from "../theme/Colors";

const SubContainer = (props) => {
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
    marginTop: StatusBar.currentHeight,
    backgroundColor: colors.bg,
  },
});

export default SubContainer;
