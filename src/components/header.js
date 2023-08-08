import React, { useCallback, useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const Header = (props) => {
  const springValues = useRef([]);

  const { children, style } = props;

  useEffect(() => {
    springValues.current.forEach((springValue, index) => {
      Animated.spring(springValue, {
        toValue: 0,
        friction: 2,
        tension: 100,
        useNativeDriver: true,
        delay: (children.length - index - 1) * 100,
      }).start();
    });
  }, [children]);

  const renderAnimatedText = useCallback(() => {
    return children.split("").map((char, index) => {
      const springValue =
        springValues.current[index] || new Animated.Value(100);
      springValues.current[index] = springValue;

      return (
        <Animated.Text
          key={index}
          style={[
            { transform: [{ translateX: springValue }] },
            styles.textStyle,
          ]}
        >
          {char}
        </Animated.Text>
      );
    });
  }, [children]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>{renderAnimatedText()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginLeft: 5,
    marginBottom: 10,
  },
  textStyle: {
    fontFamily: "SemiBold",
    fontSize: 24,
    color: "#fff",
  },
  textContainer: {
    flexDirection: "row",
  },
});

export default React.memo(Header);
