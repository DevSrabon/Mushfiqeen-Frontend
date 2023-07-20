import { View, StyleSheet, Image } from "react-native";
import React from "react";
import colors from "../theme/Colors";
import icons from "../../assets/icons";
import { AntDesign } from "@expo/vector-icons";
import {
  Row,
  SubRow,
  SubTitle,
  Title,
  HorizantalBar,
  TextSmall,
  IconContainer,
  Reactions,
} from "../components";
import Container from "../components/container";

const PostDetails = () => {
  return (
    <Container>
      <View style={styles.container}>
        <Row>
          <SubRow>
            <Image
              source={icons.user}
              resizeMode="cover"
              style={styles.userImg}
            />
            <View>
              <Title>User Name</Title>
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
            height: 250,
            marginVertical: 5,
            marginHorizontal: 10,
          }}
        >
          <SubTitle>
            দুনিয়ার মানুষ একজনে আরেকজনের কাছে শিখে। দেখে, অনুসরণ করে, দেখে চলে।
            মানুষ মাত্রই তাই। কেউ যদি বলে যে আমি নিজেই চলি তো অর্থহীন কথা। আমি
            কারো থেকে কিছু নেই না। মাকড়সা নিজের পেটের ভেতর থেকে জাল বের করে কারো
            কাছে থেকে কিছু নেয় না, ও তেমন কোন লাভ নেই। মানুষের মর্যাদাই হইলো
            শিক্ষার মধ্যে শিখতে পারে বলেই। এই সৃষ্টি জগতের মধ্যে মানুষকে আল্লাহ
            তায়ালা শিখার ক্ষমতা দিয়েছেন, বাকি কেউ খুব একটা পারে না যেটুকু পারে
            বড় অল্প। সার্কাসে কিছু বাঘ, বানর, হাতি কিছু শিখে সার্কাসের খেলা
            দেখায় খুব সীমিত। মানুষের শিক্ষার ক্ষমতা অনেক বেশি। শিখার নিয়ম হল
            যে, যে কোন কারণে নিজেকে ছোট মনে করে সে তার বড়র কাছ থেকে শেখে,
            প্রত্যেক ব্যাপারেই তাই, খেলাধুলা হোক, পোশাক আশাকে হোক। সেজন্য
            পোশাকের ব্যাপারে সাধারণত গরিবরা ধনীদের দেখে দেখে জামা কাপড় বানায়।
            বিপরীতটা হয় না ধনীরা গরিবদের দেখে তাদের ফ্যাশন বানাচ্ছে ওরকম হয়
            না। বরং গরিবরা ধনীদেরকে দেখে চলে, গ্রামবাসী শহরবাসীকে দেখে চলে।
            বিপরীত নয় শহরবাসী গ্রামকে দেখে চলছে, প্রজারা রাজাদেরকে দেখে চলে
            এটাই হলো প্রচলিত নিয়ম।
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
            <TextSmall>299</TextSmall>
          </SubRow>
          <SubRow style={{ gap: 3 }}>
            <TextSmall style={{ color: colors.primary }}>299</TextSmall>
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
        <Reactions />
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    width: "100%",
    // height: 400,
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

export default PostDetails;
