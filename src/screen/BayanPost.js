import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { DropDown, Row, SubContainer } from "../components";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const BayanPost = () => {
  const router = useRoute();
  const params = router?.params;
  const post = params?.post;

  const [lang, setLang] = useState("BN");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const { userData, setBayanRefetch } = useAuth();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (post?._id) {
      setPlace(post?.place);
      setDate(post?.date);
      setDescription(post?.description);
      setLang(post?.lang);
    }
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${userData?.accessToken}`,
    },
  };
  const onUpdate = async () => {
    try {
      const res = await axios.put(
        `https://musfiqeen-backend.vercel.app/api/v1/bayans/update/${post?._id}`,
        { description, lang, place, date },
        config
      );
      if (res.data) {
        setBayanRefetch((prev) => !prev);
        setDate("");
        setDescription("");
        setPlace("");
        navigation.navigate("Bayan");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onBayan = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `https://musfiqeen-backend.vercel.app/api/v1/bayans/create`,
        { description, lang, place, date },
        config
      );
      if (res.data) {
        setBayanRefetch((prev) => !prev);
        setDate("");
        setDescription("");
        setPlace("");
        navigation.navigate("Bayan");
      }

      console.log(res.data);
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else if (error.response.data.error) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SubContainer>
      {post?._id ? (
        <Row>
          <AntDesign
            name="arrowleft"
            size={30}
            color={colors.white}
            onPress={() => navigation.goBack()}
          />
          <FontAwesome
            name="trash-o"
            size={24}
            color={colors.primary}
            onPress={() => onDelete(item?._id)}
          />

          <Pressable onPress={onUpdate} disabled={loading}>
            <Text style={styles.button}>Update</Text>
          </Pressable>
        </Row>
      ) : (
        <Pressable onPress={onBayan} disabled={loading}>
          <Text style={styles.button}>Post</Text>
        </Pressable>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Recorded Date"
          placeholderTextColor={colors.lightGray}
          selectionColor={colors.white}
          style={styles.input}
          onChangeText={setDate}
          value={date}
        />
        <TextInput
          placeholder="Recorded Place"
          placeholderTextColor={colors.lightGray}
          selectionColor={colors.white}
          style={styles.input}
          onChangeText={setPlace}
          value={place}
        />
      </View>
      <DropDown category={lang} setCategory={setLang} />
      <ScrollView style={{ marginTop: 10 }}>
        <TextInput
          placeholder="What do you want to talk about?"
          placeholderTextColor={colors.lightGray}
          textAlignVertical={"top"}
          multiline={true}
          numberOfLines={18}
          value={description}
          onChangeText={setDescription}
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
