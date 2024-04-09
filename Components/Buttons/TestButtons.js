import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

const TestButton = ({ color, onPress }) => {
    const [buttonColor, setButtonColor] = useState(color);

    const changeColor = () => {
        setButtonColor(buttonColor === 'red' ? 'blue' : 'red');
    };

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ width: 100, height: 100, backgroundColor: buttonColor }} />
        </TouchableOpacity>
    );
};

export default TestButton;  