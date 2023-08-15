import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import NavStr from "../Nav/NavStr";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";
import HorizantalBar from "./horizontalBar";
import Row from "./row";
import SubRow from "./subRow";
import SubTitle from "./subTitle";
import TextSmall from "./textSmall";
import TimeAgo from "./timeAgo";
import Title from "./title";

const BayanCard = ({ item, setRefetch, config }) => {
  const [seeMore, setSeeMore] = useState(false);
  const [showLess, setShowLess] = useState(false);
  const { userData, setBayanRefetch } = useAuth();
  const navigation = useNavigation();
  let description;
  if (item.description?.length < 500) {
    description = item.description;
  } else if (item.description?.length >= 500) {
    description = item.description.slice(0, 500);
  }

  const onEdit = async (post) => {
    navigation.navigate(NavStr.BAYAN_POST, (state = { post }));
  };

  return (
    <View style={styles.container} key={item?._id}>
      <Row>
        <SubRow>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NavStr.PROFILE, { id: item?.user?._id });
            }}
          >
            <Image
              source={{ uri: item?.user?.imageURL }}
              resizeMode="cover"
              style={styles.userImg}
            />
          </TouchableOpacity>
          <View>
            <Title>{item?.user?.fullName}</Title>
            <TimeAgo createdAt={item?.createdAt} />
          </View>
        </SubRow>
        <View>
          <SubRow>
            <AntDesign name="clockcircleo" size={16} color={colors.primary} />
            <Title style={{ color: colors.primaryLight }}>{item?.date}</Title>
          </SubRow>
          <SubRow>
            <AntDesign name="arrowright" size={16} color={colors.primary} />
            <Title style={{ color: colors.primaryLight }}>{item?.place}</Title>
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
            <Title style={{ textAlign: "justify" }}>{description}</Title>

            <Pressable onPress={(prev) => setSeeMore(!seeMore)}>
              <Title style={{ textAlign: "right", color: colors.primaryLight }}>
                ...See More
              </Title>
            </Pressable>
          </>
        )}
        {item?.description.length > 500 && seeMore && !showLess && (
          <Title style={{ textAlign: "justify", fontSize: 14 }}>
            {item?.description}
            <Pressable
              onPress={(prev) => {
                setShowLess(!prev), setSeeMore(!prev);
              }}
            >
              <Title style={{ textAlign: "right", color: colors.primaryLight }}>
                ...Show Less
              </Title>
            </Pressable>
          </Title>
        )}
        {item?.description.length < 500 && (
          <SubTitle style={{ textAlign: "justify", fontSize: 14 }}>
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
        {userData?.data._id === item?.user?._id && (
          <TouchableOpacity
            onPress={() => onEdit(item)}
            style={{
              borderWidth: 1,
              borderColor: colors.primary,
              borderRadius: 25,
            }}
          >
            <>
              <Title
                style={{
                  color: colors.primaryLight,
                  paddingHorizontal: 10,
                  paddingVertical: 1,
                }}
              >
                Edit
              </Title>
            </>
          </TouchableOpacity>
        )}
      </Row>

      <HorizantalBar />
      {/* <IconContainer /> */}
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
