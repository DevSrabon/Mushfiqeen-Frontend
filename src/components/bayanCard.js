import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import colors from "../theme/Colors";
import HorizantalBar from "./horizontalBar";
import IconContainer from "./iconContainer";
import Row from "./row";
import SubRow from "./subRow";
import SubTitle from "./subTitle";
import TextSmall from "./textSmall";
import Title from "./title";

const BayanCard = ({ item }) => {
  const [seeMore, setSeeMore] = useState(false);

  const [showLess, setShowLess] = useState(false);

  let description;
  if (item.description?.length < 500) {
    description = item.description;
  } else if (item.description?.length >= 500) {
    description = item.description.slice(0, 500);
  }
  return (
    <View style={styles.container} key={item?._id}>
      <Row>
        <SubRow>
          <Image
            source={{ uri: item?.user?.imageURL }}
            resizeMode="cover"
            style={styles.userImg}
          />
          <View>
            <Title>{item?.user?.fullName}</Title>
            <SubTitle>{moment(item?.createdAt).fromNow()}</SubTitle>
          </View>
        </SubRow>
        <View>
          <SubRow>
            <AntDesign name="clockcircleo" size={16} color={colors.primary} />
            <Title style={{ color: colors.primary }}>{item?.date}</Title>
          </SubRow>
          <SubRow>
            <AntDesign name="arrowright" size={16} color={colors.primary} />
            <Title style={{ color: colors.primary }}>{item?.place}</Title>
          </SubRow>
        </View>
      </Row>
      <View
        style={{
          height: "auto",
          marginVertical: 5,
          marginHorizontal: 10,
        }}
      >
        {item?.description?.length >= 500 && !seeMore && !showLess && (
          <>
            <SubTitle style={{ textAlign: "justify" }}>{description}</SubTitle>
            <Pressable onPress={(prev) => setSeeMore(!seeMore)}>
              <TextSmall style={{ textAlign: "right" }}>...See More</TextSmall>
            </Pressable>
          </>
        )}
        {item?.description.length > 500 && seeMore && !showLess && (
          <SubTitle style={{ textAlign: "justify" }}>
            {item?.description}
            <Pressable
              onPress={(prev) => {
                setShowLess(!prev), setSeeMore(!prev);
              }}
            >
              <SubTitle>...Show Less</SubTitle>
            </Pressable>
          </SubTitle>
        )}
        {item?.description.length < 500 && (
          <SubTitle style={{ textAlign: "justify" }}>
            {item?.description}
          </SubTitle>
        )}
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
        {/* <SubRow style={{ gap: 3 }}>
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
        </SubRow> */}
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
