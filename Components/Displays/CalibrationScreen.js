import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Speech from 'expo-speech';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const directions = ['lets begin', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'];

const CalibrationScreen = ({ calibrationActive, onCalibrationComplete }) => {
    const position = useSharedValue({ x: 0, y: 0 });
    const [index, setIndex] = useState(0);
    const [calibrationCompleted, setCalibrationCompleted] = useState(false);

    useEffect(() => {
        if (calibrationCompleted) {
            onCalibrationComplete();
            setCalibrationCompleted(false); // Reset the completion state
        }
    }, [calibrationCompleted, onCalibrationComplete]);



    useEffect(() => {
        if (calibrationActive) {
            Speech.speak(directions[index]);
        }
    }, [index, calibrationActive]);

    useEffect(() => {
        if (calibrationActive) {
            setIndex(0);  // Reset to start
            position.value = { x: 0, y: 0 };  // Reset position to center initially
            const interval = setInterval(() => {
                setIndex(currentIndex => {
                    if (currentIndex < directions.length - 1) {
                        moveSquare(directions[currentIndex + 1]);
                        return currentIndex + 1;
                    } else {
                        moveSquare(directions[currentIndex]);
                        clearInterval(interval);
                        setCalibrationCompleted(true);
                        return currentIndex; 
                    }
                });
            }, 5000);  // Delay between movements

            return () => {
                setCalibrationCompleted(false);
                clearInterval(interval);
            }
        }
    }, [calibrationActive,  setCalibrationCompleted]);

    const moveSquare = (direction) => {
        let newX = 0;
        let newY = 0;
        switch (direction) {
            case 'top-left':
                newX = -height / 2.2;
                newY = -width / 2.4;
                break;
            case 'top-right':
                newX = height / 2.2;
                newY = -width / 2.4;
                break;
            case 'bottom-left':
                newX = -height / 2.2;
                newY = width / 2.4;
                break;
            case 'bottom-right':
                newX = height / 2.2;
                newY = width / 2.4;
                break;
            case 'center':
                newX = 0;
                newY = 0;
                break;
        }
        position.value = withSpring({ x: newX, y: newY }, { damping: 15 });
    };

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: position.value.x },
                { translateY: position.value.y },
            ],
        };
    });

    return (
        <View style={styles.overlay}>
            {calibrationActive && (
                <>
                    <Text>{directions[index]}</Text>
                    <Animated.View style={[styles.square, animatedStyles]} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    square: {
        width: 50,
        height: 50,
        backgroundColor: 'blue',
    }
});

export default CalibrationScreen;