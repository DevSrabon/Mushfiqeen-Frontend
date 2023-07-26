import React, { useEffect } from 'react';
import { Animated, View, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../theme/Colors';

export default function AnimationButton() {

    const animatedValue = new Animated.Value(0);

    useEffect(() => {
        _start()
    }, [animatedValue])

    function _start() {
        const toValue = 35
        Animated.loop(
            Animated.timing(animatedValue, {
                toValue,
                duration: 1000,
                useNativeDriver: true
            })
        ).start()
    }

    function handlePress() {
        alert('Animation button working working')
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>

                <TouchableOpacity
                    activeOpacity={0.75}
                    style={{ position: 'absolute', bottom: 20, height: 60, width: 200, backgroundColor: colors.lightGray, alignSelf: 'center', borderRadius: 20, flexDirection: 'row' }}
                    onPress={handlePress}>

                    <View style={{ height: 60, width: 140, alignItems: 'center', justifyContent: 'center', }}>
                        <Text>
                            Animation button
                        </Text>
                    </View>

                    <View style={{ height: 60, width: 60, justifyContent: 'center', }}>
                        <Animated.View
                            style={{ height: 30, width: 30, transform: [{ translateX: animatedValue }] }}>
                            <Image
                                source={{ uri: 'https://cdn.iconscout.com/icon/free/png-256/right-arrow-1438234-1216195.png' }}
                                style={{ height: '100%', width: '100%' }}
                            />
                        </Animated.View>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}