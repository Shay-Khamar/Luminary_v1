import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontProvider } from '../misc/FontContext'
import CustomText from '../misc/CustomText'

const ComprehensionWindow = (item, index) => {
  return (
    <FontProvider>
    <View style={styles.compWindowContainer}>
      <CustomText style={styles.QuestionHeader}>{item.question}</CustomText>
      <View style={styles.OptionsContainer}>

      </View>
    </View>
    </FontProvider>
  )
}

export default ComprehensionWindow

const styles = StyleSheet.create({

    compWindowContainer : {
        backgroundColor: '#fff',
        height: '50%',
        width: '30%',
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: 'absolute',

    },

    QuestionHeader : {
        fontSize: 24,
        textAlign: 'center',
    },

    OptionsContainer : {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '50%',
        width: '70%',
        paddingHorizontal: 10,
    }
})