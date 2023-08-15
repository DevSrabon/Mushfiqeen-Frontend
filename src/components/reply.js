import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../theme/Colors";
import NormalText from "./normalText";
import Row from "./row";
import SubTitle from "./subTitle";
import TimeAgo from "./timeAgo";
const Replies = ({ reply }) => {
  return (
    <View key={reply?._id} style={styles.subContainer}>
      <View style={{ flexDirection: "row", gap: 5, padding: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(NavStr.PROFILE, {
              id: reply?.userId?._id,
            });
          }}
        >
          <Image
            source={{ uri: reply?.userId?.imageURL }}
            style={styles.userImg}
          />
        </TouchableOpacity>
        <View style={styles.subCommentBox}>
          <View style={{ padding: 10 }}>
            <Row style={{ padding: 0 }}>
              <SubTitle>{reply?.userId?.fullName}</SubTitle>
            </Row>

            <TimeAgo createdAt={reply?.createdAt} />
            <NormalText style={{ marginVertical: 5 }}>
              {reply?.reply}
            </NormalText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(Replies);

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: colors.bg,
    marginLeft: 40,
  },
  commentBox: {
    backgroundColor: colors.lightBg,
    width: "90%",
    borderRadius: 8,
    borderColor: colors.white,
  },
  subCommentBox: {
    backgroundColor: colors.lightBg,
    width: "89%",
    borderRadius: 8,
    borderColor: colors.white,
  },
  userImg: {
    height: 35,
    width: 35,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
});
