import React from "react";
import { Text, View } from "react-native";
import { Protect } from "../Nav/ProtectedRoute";

const Chat = () => {
  return (
    <View>
      <Text>Chat</Text>
    </View>
  );
};

export default Protect(Chat);
