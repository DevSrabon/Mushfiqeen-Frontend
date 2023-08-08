import React from "react";
import { Dimensions, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import colors from "../theme/Colors";

const SubContainer = (props) => {
  console.log("container");
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

export default React.memo(SubContainer);
