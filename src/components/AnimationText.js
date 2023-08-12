import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const AnimationTest = () => {
    const animatedBasic = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(animatedBasic, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const translateY = animatedBasic.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box, { transform: [{ translateY }] }]} >

            </Animated.View>
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
    },
});

export default AnimationTest;
