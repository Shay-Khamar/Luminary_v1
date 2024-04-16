import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { FontProvider } from '../misc/FontContext'
import CustomText from '../misc/CustomText'


const OptionsButton = ({onPress, children}) => {
  return (
    <FontProvider>
    <TouchableOpacity style={styles.Button} onPress={onPress}>
        <CustomText>{children}</CustomText>
    </TouchableOpacity>
    </FontProvider>
  )
}

export default OptionsButton

styles = StyleSheet.create({
    Button: {
        backgroundColor: '#fff',
        height: '22%',
        width: '100%',
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }

})