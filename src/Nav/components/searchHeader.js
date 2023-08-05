import React from "react";
import { TouchableOpacity, TextInput, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../theme/Colors";
import { Row } from "../../components";
import { useAuth } from "../../contexts/useAuth";
import icons from "../../../assets/icons";

const SearchHeader = (props) => {
  const { navigation } = props;
  const { userData } = useAuth();
  return (
    <Row style={{ backgroundColor: colors.bg }}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        {!userData?.data?.imageURL ? (
          <Image size={32} source={icons.user} style={styles.headerImg} />
        ) : (
          <Image
            size={32}
            source={{ uri: userData?.data?.imageURL }}
            style={styles.headerImg}
          />
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Search User"
        placeholderTextColor={colors.lightGray}
        selectionColor={colors.lightGray}
      />
      <Ionicons name="notifications" size={30} color={colors.white} />
    </Row>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "75%",
    backgroundColor: colors.bg,
    borderWidth: 0.5,
    borderRadius: 25,
    borderColor: colors.lightGray,
    paddingHorizontal: 10,
    color: colors.white,
    height: 40,
    fontSize: 14,
  },
  headerImg: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
});

export default SearchHeader;
