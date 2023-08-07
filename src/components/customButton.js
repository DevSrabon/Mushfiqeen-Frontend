import React, { useState } from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../theme/Colors";

const CustomButton = ({
  onPress,
  text,
  type,
  bgColor,
  fgColor,
  disabled,
  style,
  loading = false,
}) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const animateButton = () => {
    Animated.timing(scaleValue, {
      toValue: 0.85,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };
  const handlePress = () => {
    // Call both functions
    animateButton();
    onPress();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress} disabled={disabled}>
      <Animated.View
        style={[
          styles.container,
          style,
          styles[`container_${type}`],
          bgColor ? { backgroundColor: bgColor } : {},
          { transform: [{ scale: scaleValue }] },
        ]}
      >
        {!loading ? (
          <Text
            style={[
              styles.text,
              styles[`text_${type}`],
              fgColor ? { color: fgColor } : {},
            ]}
          >
            {text}
          </Text>
        ) : (
          <ActivityIndicator color={"#ffff"} size={40} />
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    maxHeight: 50,
    padding: 15,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  container_primary: {
    backgroundColor: colors.bg,
    borderColor: colors.lightGray,
    borderWidth: 2,
  },
  container_tertiary: {
    width: "30%",
    padding: 0,
    // alignSelf: "center",

    marginVertical: 0,
    // marginHorizontal: 50,
  },
  text: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: "white",
  },
  text_tertiary: {
    color: colors.white,
    // color: "white",
  },
});

export default CustomButton;
