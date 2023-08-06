import React from "react";
import { StyleSheet, ScrollView, Pressable, Image, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import SubContainer from "./subContainer";
import colors from "../theme/Colors";
import Title from "./title";
import SubRow from "./subRow";
import Row from "./row";
import icons from "../../assets/icons";
import SubTitle from "./subTitle";
import HorizantalBar from "./horizontalBar";

const ReactionDetails = (props) => {
  const { navigation } = props;
  return (
    <SubContainer>
      <ScrollView>
        <SubRow>
          <AntDesign
            name="arrowleft"
            size={30}
            color={colors.white}
            onPress={() => navigation.goBack()}
            style={{ paddingLeft: 10 }}
          />
          <Title style={{ fontSize: 24, marginLeft: 100 }}>Reactions</Title>
        </SubRow>
        <Title
          style={{
            color: colors.primary,
            paddingLeft: 20,
            paddingVertical: 10,
          }}
        >
          Total 20
        </Title>
        <Row>
          <SubRow>
            <Pressable
              onPress={() => {
                navigation.navigate(NavStr.PROFILE);
                //   , { id: post?.user?._id }
              }}
            >
              {/* {post?.user?.imageURL ? ( */}
              {/* <Image
                source={{ uri: post?.user?.imageURL }}
                resizeMode="cover"
                style={styles.userImg}
              /> */}
              {/* ) : ( */}
              <Image
                source={icons.user}
                resizeMode="cover"
                style={styles.userImg}
              />
              {/* )} */}
            </Pressable>
            <View>
              <Title>Title</Title>
              <SubTitle>Subtitle</SubTitle>
              <SubTitle>Like 2d ago</SubTitle>
            </View>
          </SubRow>
          {/* {isFollowing ? (
          <SubRow style={{ gap: 0 }}>
            <AntDesign name="Safety" size={16} color={colors.primary} />
            <Title style={{ color: colors.primary }}>Followed</Title>
          </SubRow>
        ) : (
          <Pressable onPress={onFollow}>
            <SubRow style={{ gap: 0 }}>
              <AntDesign name="plussquareo" size={16} color={colors.primary} />
              <Title style={{ color: colors.primary }}>Follow</Title>
            </SubRow>
          </Pressable>
        )} */}
        </Row>
        <HorizantalBar />
      </ScrollView>
    </SubContainer>
  );
};

const styles = StyleSheet.create({
  userImg: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignSelf: "center",
  },
});

export default ReactionDetails;
