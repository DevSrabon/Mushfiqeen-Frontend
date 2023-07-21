import { View, Text } from "react-native";
import React from "react";
import DrawerNavigation from "./DrawerNavigation";

const Parent = () => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerNavigation />
    </View>
  );
};

export default Parent;
