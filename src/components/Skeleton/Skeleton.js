import { StyleSheet, Text, View, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import colors from "../../theme/Colors";
const Skeleton = ({ width, height, style }) => {
    const translateX = useRef(new Animated.Value(-width)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(translateX, {
                toValue: width,
                useNativeDriver: true,
                duration: 1000, // You can adjust the duration here
            })
        ).start();
    }, [width]);

    return (
        <View
            style={StyleSheet.flatten([
                {
                    width: width,
                    height: height,
                    backgroundColor: colors.lightBg,
                    overflow: "hidden",
                },
                style,
            ])}
        >
            <Animated.View
                style={{
                    width: "100%",
                    height: "100%",
                    transform: [{ translateX: translateX }],
                }}
            >
                <LinearGradient
                    style={{ width: "100%", height: "100%" }}
                    colors={["transparent", colors.lightGray, "transparent"]}
                    start={{ x: 1, y: 1 }}
                />
            </Animated.View>
        </View>
    );
};

export default Skeleton;
