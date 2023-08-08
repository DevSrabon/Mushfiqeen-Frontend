import { AntDesign, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import icons from "../../../assets/icons";
import { HorizantalBar, Row, SubRow, Title } from "../../components";
import { useAuth } from "../../contexts/useAuth";
import colors from "../../theme/Colors";
import NavStr from "../NavStr";

function CustomDrawer(props) {
  const { setToken, setUserData, setLoading, userData } = useAuth();
  const { navigation } = props;

  const moveToScreen = (screen) => {
    if (!userData?.data) return navigation.navigate(NavStr.LOGIN);
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
        <Row>
          <View>
            {userData?.data ? (
              <Image
                source={{ uri: userData?.data?.imageURL }}
                style={styles.img}
              />
            ) : (
              <Image source={icons.user} style={styles.img} />
            )}
            <Title>{userData?.data?.fullName || "Test user"}</Title>
          </View>
          <AntDesign
            name="close"
            size={20}
            color={colors.white}
            onPress={() => navigation.closeDrawer()}
            style={{ alignSelf: "flex-start" }}
          />
        </Row>
        <View style={{ paddingLeft: 20, gap: 10, marginTop: 30 }}>
          <TouchableOpacity
            style={{ alignItems: "flex-start" }}
            onPress={() => moveToScreen(NavStr.PROFILE)}
          >
            <SubRow>
              <SimpleLineIcons name="user" size={20} color={colors.white} />
              <Title>Profile</Title>
            </SubRow>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => moveToScreen(NavStr.SETTINGS)}
            style={{ alignItems: "flex-start" }}
          >
            <SubRow>
              <MaterialIcons name="settings" size={20} color={colors.white} />
              <Title>Settings</Title>
            </SubRow>
          </TouchableOpacity>
        </View>
        <HorizantalBar style={{ marginTop: 50 }} />

        {userData?.data ? (
          <Pressable
            onPress={onLogOut}
            style={{ alignItems: "flex-end", padding: 10 }}
          >
            <Title>Log Out</Title>
          </Pressable>
        ) : (
          <Pressable
            onPress={onSignIn}
            style={{ alignItems: "flex-end", paddingHorizontal: 20 }}
          >
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
