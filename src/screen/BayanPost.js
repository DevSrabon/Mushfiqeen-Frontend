import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import colors from "../theme/Colors";
import { DropDown, Row, SubContainer } from "../components";

const BayanPost = () => {
  return (
    <SubContainer>
      <Pressable>
        <Text style={styles.button}>Post</Text>
      </Pressable>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Recorded Date"
          placeholderTextColor={colors.lightGray}
          selectionColor={colors.white}
          style={styles.input}
        />
        <TextInput
          placeholder="Recorded Place"
          placeholderTextColor={colors.lightGray}
          selectionColor={colors.white}
          style={styles.input}
        />
      </View>
      <DropDown />
      <ScrollView style={{ marginTop: 10 }}>
        <TextInput
          placeholder="What do you want to talk about?"
          placeholderTextColor={colors.lightGray}
          textAlignVertical={"top"}
          multiline={true}
          numberOfLines={18}
          maxHeight={450}
          selectionColor={colors.white}
          style={{
            backgroundColor: colors.bg,
            color: colors.white,
            fontSize: 18,
            paddingHorizontal: 10,
          }}
        />
      </ScrollView>
    </SubContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    fontFamily: "SemiBold",
    fontSize: 20,
    color: colors.primary,
    alignSelf: "flex-end",
    marginRight: 20,
    paddingVertical: 10,
  },
  input: {
    paddingVertical: 5,
    backgroundColor: colors.bg,
    color: colors.white,
    fontSize: 14,
    paddingHorizontal: 10,
    borderColor: colors.lightBg,
    borderWidth: 1,
    borderRadius: 8,
    width: "50%",
  },
  inputContainer: {
    flexDirection: "row",
    width: "90%",
    gap: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default BayanPost;
