import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import PostDetails from "../screen/PostDetails";

const PageAnimation = () => {
  const [animationOpen, setAnimationOpen] = useState(false);
  const AniPage = useRef(new Animated.Value(1500)).current;

  function DetailsPageAni() {
    Animated.timing(AniPage, {
      toValue: !animationOpen ? -20 : 1500,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }

  const toggle = () => {
    DetailsPageAni();
  };

  return (
    <View style={{ marginTop: 5 }}>
      <View style={styles.Container}>
        <Pressable
          style={[styles.box, styles.buttonBox]}
          onPress={() => { toggle(); }}
        >
          <Text style={styles.title}>Details page</Text>
          <Text style={styles.subTitle}>
            Go to the Post details.
          </Text>
        </Pressable>
      </View>

      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          height: 700,
          backgroundColor: "#fff",
          top: 20,
          transform: [{ translateY: AniPage }],
        }}
      >
        <PostDetails />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {

    alignSelf: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: "#252525",
  },
  subTitle: {
    fontFamily: "Medium",
    fontSize: 13,
    color: "#667085",
    paddingVertical: 8,
  },

  box: {
    width: 340,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 20,
    marginVertical: 5,
    alignItems: "flex-start",
    borderRadius: 10,
    backgroundColor: "#F5F6F7",
    borderColor: "#F5F6F7",
  },
  buttonBox: {
    backgroundColor: "#efedf8",
    borderWidth: 1,
    borderColor: "#B4AAF2",
    borderRadius: 6,
  },

});
export default PageAnimation;
