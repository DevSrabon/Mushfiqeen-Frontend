import { View, StyleSheet, Animated, Text } from "react-native";
import React, { useEffect, useRef } from "react";

const Header = (props) => {
  const springValues = useRef([]);

  const text = props.children;

  useEffect(() => {
    springValues.current.forEach((springValue, index) => {
      Animated.spring(springValue, {
        toValue: 0,
        friction: 2,
        tension: 100,
        useNativeDriver: true,
        delay: (text.length - index - 1) * 100,
      }).start();
    });
  }, []);

  const renderAnimatedText = () => {
    return text.split("").map((char, index) => {
      const springValue = useRef(new Animated.Value(100)).current;
      springValues.current[index] = springValue;

      return (
        <Animated.Text
          key={index}
          style={[
            { transform: [{ translateX: springValue }] },
            {
              fontFamily: "SemiBold",
              fontSize: 24,
              color: "#312E49",
            },
          ]}
        >
          {char}
        </Animated.Text>
      );
    });
  };

  return (
    <View
      style={{
        alignSelf: "flex-start",
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 10,
      }}
    >
      <View style={{ ...styles.typography, ...props.style }}>
        <View style={styles.container}>
          <View style={styles.textContainer}>{renderAnimatedText()}</View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  typography: {
    fontFamily: "SemiBold",
    fontSize: 24,
    color: "#312E49",
  },
  textContainer: {
    flexDirection: "row",
  },
});

export default Header;
