import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../theme/Colors";

const InputField = ({
  value,
  setValue,
  placeholder,
  placeHolderColor,
  secureTextEntry,
  multiline,
  editable,
  numberOfLines,
  keyboardType,
  style,
  inputStyles,
  error,
  width = "90%",
  ...restOfProps
}) => {
  const inputref = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [focusAnim, isFocused]);

  return (
    <View style={[style, { marginVertical: 15, width }]}>
      <TextInput
        // style={[styles.input, inputStyles]}
        style={[
          styles.input,
          error ? styles.errorBorder : styles.successBorder,
          (isFocused || value) && styles.textInput,
        ]}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        value={value}
        multiline={multiline}
        editable={editable}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        blurOnSubmit={true}
        ref={inputref}
        onBlur={() => {
          setIsFocused(false);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        {...restOfProps}
      />
      <Animated.View
        style={[
          styles.labelContainer,
          error ? styles.errorBorder : styles.successBorder,
          isFocused || value
            ? styles.labelFocusContainer
            : styles.labelContainer,
          {
            top: value
              ? -9
              : focusAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [13, -9],
                }),
          },
        ]}
      >
        <Animated.Text
          onPress={() => inputref.current.focus()}
          style={[
            styles.label,
            error ? styles.errorBorder : styles.successBorder,
            {
              fontSize: value
                ? -14
                : focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [15, 14],
                  }),
            },
          ]}
        >
          {placeholder}
        </Animated.Text>
      </Animated.View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  error: { color: "red" },
  input: {
    width: "100%",
    backgroundColor: colors.lightBg,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontFamily: "Medium",
    height: 50,
    fontSize: 17,
  },

  errorBorder: {
    borderColor: "red",
    color: "red",
  },
  successBorder: {
    borderColor: "#B4AAF2",
    color: "white",
  },
  labelContainer: {
    position: "absolute",
    left: 16,
    paddingHorizontal: 5,
  },
  labelFocusContainer: {
    position: "absolute",
    left: 16,
    // paddingHorizontal: 7,
    paddingVertical: 1,
    backgroundColor: colors.lightBg,
    borderWidth: 1,
    borderRadius: 5,
  },

  textInput: {
    borderWidth: 1,
    color: colors.white,
    backgroundColor: colors.lightGray,
  },
});
