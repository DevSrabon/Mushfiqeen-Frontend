import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import colors from "../theme/Colors";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="blue" />
      {/* <Text>Loading...</Text> */}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bg,
  },
});
