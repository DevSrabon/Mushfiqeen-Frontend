import React, { useEffect, useMemo, useRef, useState } from "react";
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
  defaultValue,
  keyboardType,
  style,
  inputStyles,
  error,
  width = "100%",
  ...restOfProps
}) => {
  const inputref = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  return (
    <View style={[style, { marginVertical: 10, alignItems: "center", width }]}>
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
        cursorColor={"white"}
        editable={editable}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        defaultValue={defaultValue}
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
      {placeholder && (
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
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  error: { color: "red", alignSelf: "flex-start", paddingLeft: 20 },
  input: {
    width: "90%",
    alignItems: "center",
    backgroundColor: colors.bg,
    borderBottomWidth: 2,
    borderColor: "red",
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
    borderColor: colors.lightGray,
    color: colors.lightGray,
  },
  labelContainer: {
    position: "absolute",
    left: 20,
    // paddingHorizontal: 5,
  },
  labelFocusContainer: {
    position: "absolute",
    left: 20,
    // paddingHorizontal: 7,
    // paddingVertical: 1,
    // backgroundColor: colors.bg,
    // borderWidth: 1,
    // borderRadius: 5,
  },

  textInput: {
    // borderWidth: 1,
    color: colors.white,
    // backgroundColor: colors.lightGray,
    borderColor: colors.lightGray,
  },
});
export default React.memo(InputField);
