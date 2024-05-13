import React from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * A display box component designed to showcase an icon or any small component centered within a bordered box.
 * 
 * @param {Object} props - The props passed to the component.
 * @param {React.ReactNode} props.icon - The icon or component to display inside the box.
 */
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
