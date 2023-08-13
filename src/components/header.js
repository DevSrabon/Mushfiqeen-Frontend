import React, { useCallback, useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import colors from "../theme/Colors";

const Header = (props) => {
  const bounceValues = useRef([]);

  const { children, style } = props;

  useEffect(() => {
    bounceValues.current.forEach((bounceValue, index) => {
      const bounceAnimation = Animated.spring(bounceValue, {
        toValue: 1,
        friction: 2,
        tension: 100,
        useNativeDriver: true,
        delay: (children.length - index - 1) * 300,
      });

      // Create an infinite loop animation
      Animated.loop(bounceAnimation).start();
    });
  }, [children]);

  const renderAnimatedText = useCallback(() => {
    return children.split("").map((char, index) => {
      const bounceValue = bounceValues.current[index] || new Animated.Value(0);
      bounceValues.current[index] = bounceValue;

      return (
        <Animated.Text
          key={index}
          style={[
            { transform: [{ scale: bounceValue }] },
            styles.textStyle,
          ]}
        >
          {char}
        </Animated.Text>
      );
    });
  }, [children]);

  return <View style={styles.textContainer}>{renderAnimatedText()}</View>;
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "SemiBold",
    fontSize: 24,
    color: colors.primary,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
  },
});

export default React.memo(Header);
