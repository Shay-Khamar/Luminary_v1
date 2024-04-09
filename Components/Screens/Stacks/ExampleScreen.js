import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CameraScreen from '../../Displays/CameraScreen'

const ExampleScreen = () => {
  return (
    <View style={styles.container}>
      <CameraScreen />
    </View>
  )
}

export default ExampleScreen

const styles = StyleSheet.create({

  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})