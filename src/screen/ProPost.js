import { EvilIcons } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { Pressable, ScrollView, StatusBar, View } from "react-native";
import NavStr from "../Nav/NavStr";
import {
  HorizantalBar,
  SubContainer,
  SubRow,
  SubTitle,
  TextSmall,
} from "../components";
import Row from "../components/row";
import Title from "../components/title";
import { useAuth } from "../contexts/useAuth";
import colors from "../theme/Colors";

const ProPost = ({ navigation }) => {
  const { profile } = useAuth();

  // const navigation = useNavigation();
  const onNavigate = useCallback(
    (item) => {
      navigation.navigate(NavStr.POSTDETAILS, { post: item });
    },
    [navigation]
  );
  return (
    <SubContainer>
      <Row style={{ marginTop: StatusBar.currentHeight }}>
        <EvilIcons
          name="close"
          size={30}
          color={colors.secondary}
          onPress={() => navigation.goBack()}
        />

        <Title>All Posts</Title>
      </Row>
      <ScrollView>
        {profile?.posts
          ?.slice(0)
          .reverse()
          .map((item, index) => (
            <Pressable onPress={() => onNavigate(item)} key={index}>
              <View
                style={{
                  paddingHorizontal: 10,
                  // paddingVertical: 10,
                }}
              >
                <SubTitle style={{ paddingVertical: 5, paddingLeft: 10 }}>
                  {item?.description?.length > 100
                    ? item?.description?.slice(0, 100) + " ...See More"
                    : item?.description}
                </SubTitle>

                <SubRow
                  style={{
                    gap: 3,
                    alignSelf: "flex-end",
                    paddingVertical: 5,
                    paddingRight: 10,
                  }}
                >
                  <TextSmall style={{ color: colors.primary }}>
                    {item?.likes}
                  </TextSmall>
                  <TextSmall>Likes</TextSmall>

                  <SubTitle>||</SubTitle>

                  <TextSmall style={{ color: colors.primary }}>
                    {item?.commentsLength}
                  </TextSmall>
                  <TextSmall>Comments</TextSmall>
                </SubRow>
                <HorizantalBar />
              </View>
            </Pressable>
          ))}
      </ScrollView>
    </SubContainer>
  );
};

export default ProPost;
