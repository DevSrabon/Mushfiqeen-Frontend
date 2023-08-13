import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Text } from 'react-native';

const AnimationTest = () => {
  const springValue = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    Animated.spring(springValue, {
      toValue: 2,
      friction: 2,
      tension: 100,
      useNativeDriver: true,
    }).start(() => {
      // When the animation completes, restart the animation loop
      startAnimation();
    });
  };

  // Start the animation loop initially
  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={startAnimation} disabled>
        <Animated.View
          style={[
            styles.box,
            {
              transform: [{ scale: springValue }],
            },
          ]}
        >
          {/* This view uses spring animation */}
        </Animated.View>
        <Animated.Text
          style={[
            styles.text,
            {
              transform: [{ scale: springValue }],
            },
          ]}
        >
          Spring Animation
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    color: 'blue',
  },
});

export default AnimationTest;
