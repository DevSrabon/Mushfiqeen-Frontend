import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import colors from "../theme/Colors";
import Row from "./row";
const Input = ({ value, image, onPress, loading, ...props }) => {
  return (
    <Row style={{ gap: 5 }}>
      <Image source={{ uri: image }} style={styles.userImg} />
      <ScrollView>
        <TextInput
          placeholderTextColor={colors.lightGray}
          multiline={true}
          selectionColor={colors.white}
          style={styles.input}
          value={value}
          {...props}
        />
      </ScrollView>
      <Pressable onPress={onPress} disabled={!value || loading}>
        <MaterialCommunityIcons
          name="send"
          size={30}
          color={!value || loading ? colors.primaryLight : colors.primary}
        />
      </Pressable>
    </Row>
  );
};

export default Input;

const styles = StyleSheet.create({
  userImg: {
    height: 35,
    width: 35,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  input: {
    backgroundColor: colors.bg,
    color: colors.white,
    fontSize: 18,
    borderColor: colors.lightBg,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
