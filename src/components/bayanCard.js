import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import icons from "../../assets/icons";
import {
  HorizantalBar,
  IconContainer,
  Row,
  SubRow,
  SubTitle,
  TextSmall,
  Title,
} from "../components";
import colors from "../theme/Colors";

const BayanCard = ({ item }) => {
  return (
    <View style={styles.container}>
      <Row>
        <SubRow>
          <Image
            source={icons.user}
            resizeMode="cover"
            style={styles.userImg}
          />
          <View>
            <Title>{item?.user?.fullName}</Title>
            <SubTitle>Sub title of user</SubTitle>
          </View>
        </SubRow>
        <SubRow>
          <AntDesign name="plussquareo" size={16} color={colors.primary} />
          <Title style={{ color: colors.primary }}>Follow</Title>
        </SubRow>
      </Row>
      <View
        style={{
          height: "auto",
          marginVertical: 5,
          marginHorizontal: 10,
        }}
      >
        <SubTitle style={{ textAlign: "justify" }}>
          {item?.description}
        </SubTitle>
      </View>
      <Row>
        <SubRow>
          <AntDesign
            name="like1"
            size={12}
            color={colors.primary}
            style={styles.icon}
          />
          <TextSmall>2</TextSmall>
        </SubRow>
        <SubRow style={{ gap: 3 }}>
          <TextSmall style={{ color: colors.primary }}>3</TextSmall>
          <TextSmall>Comments</TextSmall>
          <View
            style={{
              borderColor: colors.white,
              borderWidth: 3,
              borderRadius: 25,
              alignSelf: "center",
            }}
          />
          <TextSmall style={{ color: colors.primary }}>2</TextSmall>
          <TextSmall>Share</TextSmall>
        </SubRow>
      </Row>

      <HorizantalBar />
      <IconContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    width: "100%",
    // height: 400,
    marginBottom: 10,
    marginTop: 10,
  },
  userImg: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignSelf: "center",
  },
  icon: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 25,
    padding: 3,
  },
});

export default BayanCard;
