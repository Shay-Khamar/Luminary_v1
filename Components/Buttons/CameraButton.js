/**
 * Camera button component for React Native
 */

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

/**
 * Camera button component
 * @param {function} onTouch - Function to call when button is pressed
 * @param {string} text - Text to display on button
 * @param {string} color - Background color of button
 * @param {string} textColor - Text color
 * @param {string} iconName - Name of icon
 * @param {number} iconSize - Size of icon
 * @param {number} size - Size of button
 */
const CameraButton = ({ onTouch, text, color, textColor, iconName, iconSize, size }) => {

  /**
   * Calculate border radius based on size for rounded effect
   */
  const borderRadiusValue = size * 0.2; 

  return (
    <TouchableOpacity 
      onPress={onTouch}
      style={[
        styles.buttonContainer, 
        { backgroundColor: color },
        { 
          width: size,
          height: size, 
          borderRadius: borderRadiusValue,
        }
      ]}
    >
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name={iconName} size={iconSize} color={textColor} />
        </View>
        <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

/** 
 * Styles for the component
 */
const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    minHeight: 40,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    width: '100%', 
    fontWeight: 'bold',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
     
  },
});

export default CameraButton;