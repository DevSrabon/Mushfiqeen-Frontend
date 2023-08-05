import { DrawerContentScrollView } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import NavStr from "../NavStr";
import colors from "../../theme/Colors";
import {
  Image,
  Pressable,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import icons from "../../../assets/icons";
import { useAuth } from "../../contexts/useAuth";
import { SubRow, Title } from "../../components";

function CustomDrawer(props) {
  const { setToken, setUserData, setLoading, userData } = useAuth();
  const { navigation } = props;

  const moveToScreen = (screen) => {
    navigation.navigate(screen);
  };

  const onLogOut = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem("token");
      setToken(null);
      setUserData(null);
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
      navigation.navigate(NavStr.LOGIN);
    }
  };

  const onSignIn = () => {
    navigation.navigate(NavStr.LOGIN);
  };

  return (
    <DrawerContentScrollView style={{ backgroundColor: colors.bg }} {...props}>
      <>
        <View style={styles.content}>
          <AntDesign
            name="close"
            size={20}
            color={colors.white}
            onPress={() => navigation.closeDrawer()}
            style={{ alignSelf: "flex-end" }}
          />
          <Image
            source={{ uri: userData?.data?.imageURL } || icons.user}
            style={styles.img}
          />
          <Title>{userData?.data?.fullName || "Test user"}</Title>
        </View>

        <TouchableOpacity onPress={() => moveToScreen(NavStr.PROFILE)}>
          <SubRow>
            <SimpleLineIcons name="user" size={20} color={colors.white} />
            <Title>Profile</Title>
          </SubRow>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => moveToScreen(NavStr.SETTINGS)}>
          <SubRow>
            <MaterialIcons name="settings" size={20} color={colors.white} />
            <Title>Settings</Title>
          </SubRow>
        </TouchableOpacity>

        {userData?.data ? (
          <Pressable onPress={onLogOut}>
            <Title>Log Out</Title>
          </Pressable>
        ) : (
          <Pressable onPress={onSignIn}>
            <Title>Sign In</Title>
          </Pressable>
        )}
      </>
    </DrawerContentScrollView>
  );
}

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

export default CustomDrawer;
