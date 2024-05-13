
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colours from '../../colours';

/**
 * Renders a square button with customizable text and an onPress event.
 * 
 * @param {Object} props - The props for the component.
 * @param {string} props.value - The text to display inside the button.
 * @param {Function} props.onPress - The function to call when the button is pressed.
 */
const Exercise2Button = ({ value, onPress }) => {
    return (
        <TouchableOpacity style={styles.square} onPress={() => onPress(value)}>
            <Text style={styles.text}>{value}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    square: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        margin: 10,
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 2,
    },
    text: {
        fontSize: 30,
        color: '#000',
    },
});

export default Exercise2Button;