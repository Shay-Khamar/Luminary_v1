//Exercise2DisplayBox.js
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Exercise2DisplayBox = ({ icon }) => {
    return (
        <View style={styles.displayBox}>
            {icon}
        </View>
    );
};

const styles = StyleSheet.create({
    displayBox: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
    },
});

export default Exercise2DisplayBox;