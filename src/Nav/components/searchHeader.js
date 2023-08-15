import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import icons from "../../../assets/icons";
import { Row } from "../../components";
import { useAuth } from "../../contexts/useAuth";
import colors from "../../theme/Colors";
const SearchHeader = ({ navigation, onSearch }) => {
  const { userData } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery]);

  return (
    <Row
      style={{ backgroundColor: colors.bg, marginTop: StatusBar.currentHeight }}
    >
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
        value={searchQuery}
        onChangeText={setSearchQuery}
        // onSubmitEditing={handleSearch}
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

export default React.memo(SearchHeader);
