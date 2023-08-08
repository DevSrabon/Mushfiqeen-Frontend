import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import NavStr from "../Nav/NavStr";
import colors from "../theme/Colors";
import HorizantalBar from "./horizontalBar";
import Row from "./row";
import SubContainer from "./subContainer";
import SubRow from "./subRow";
import SubTitle from "./subTitle";
import Title from "./title";

const ReactionDetails = (props) => {
  const { likersArr } = props.route.params;

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
          Total {likersArr?.length}
        </Title>
        {likersArr?.map((liker) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NavStr.PROFILE, { id: liker?._id });
            }}
            key={liker?._id}
          >
            <Row>
              <SubRow>
                <Pressable
                  onPress={() => {
                    navigation.navigate(NavStr.PROFILE);
                  }}
                >
                  <Image
                    source={{ uri: liker?.imageURL }}
                    resizeMode="cover"
                    style={styles.userImg}
                  />
                  {/* )} */}
                </Pressable>
                <View>
                  <Title>{liker?.fullName}</Title>
                  <SubTitle>{liker?.designation}</SubTitle>
                </View>
              </SubRow>
            </Row>
            <HorizantalBar />
          </TouchableOpacity>
        ))}
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
