import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const ResultScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>TASK COMPLETETED !</Text>
    </View>
  )
}

export default ResultScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },

    placeholder : {
        fontSize: 100,
        fontWeight: '700',
        borderRadius: 10,
        borderColor: 'green',
        color: 'black',

    }
})