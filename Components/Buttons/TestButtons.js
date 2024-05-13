import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

/**
 * A button that toggles its background color between red and blue when pressed.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.color - Initial color of the button, expected to be either 'red' or 'blue'.
 * @param {Function} props.onPress - Callback function to be called when the button is pressed.
 */
const TestButton = ({ color, onPress }) => {
    // State to manage the button's current color.
    const [buttonColor, setButtonColor] = useState(color);

    // Function to toggle the button's color.
    const changeColor = () => {
        setButtonColor(buttonColor === 'red' ? 'blue' : 'red');
    };

    return (
        <TouchableOpacity onPress={() => { onPress(); changeColor(); }}>
            <View style={{ width: 100, height: 100, backgroundColor: buttonColor }} />
        </TouchableOpacity>
    );
};

export default TestButton;