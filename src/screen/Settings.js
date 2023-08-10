import React from "react";
import { View } from "react-native";
import Header from "../components/header";
import colors from "../theme/Colors";

const Settings = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.bg,
      }}
    >
      <Header>Coming Soon</Header>
    </View>
  );
};

export default Settings;
