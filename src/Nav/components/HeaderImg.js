import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../theme/Colors";
import { Row } from "../../components";
import { useAuth } from "../../contexts/useAuth";
import icons from "../../../assets/icons";
// import { useNavigation } from "@react-navigation/native";

const HeaderImg = (props) => {
  const { navigation } = props;
  const { setToken, setUserData, setLoading, userData } = useAuth();
  return (
    <Row>
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
      <TextInput />
      <Ionicons
        name="notifications-circle-outline"
        size={20}
        color={colors.white}
      />
    </Row>
  );
};

const styles = StyleSheet.create({
  headerImg: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginLeft: 10,
  },
  img: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  content: {
    marginTop: 30,
    height: 200,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
});

export default HeaderImg;
{
  /* <Ionicons
          name="ios-return-down-back-sharp"
          size={24}
          color={colors.white}
        /> */
}
