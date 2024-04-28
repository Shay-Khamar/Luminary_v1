import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {ThemedButton} from "react-native-really-awesome-button";
import { useNavigation } from '@react-navigation/native';
import CameraScreen from '../../Displays/CameraScreen'
import ReadingCatalogue from '../Stacks/ReadingCatalogue';


const Home = () => {

const navigation = useNavigation();

const toCamera = () => {
  navigation.navigate('CameraScreen');
}

const ExtractSelectScreen = () => {
  navigation.navigate('ReadingCatalogue');
}
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>This is what the home screen looks like</Text>
      <View style={styles.buttonLayout}>
      <ThemedButton name="bruce" type="primary" style={styles.button} width={100} onPressOut={toCamera} backgroundColor={"#000"} textSize={15} >Launch Camera </ThemedButton>
      <ThemedButton name="bruce" type="primary" style={styles.button} width={100} onPressOut={ExtractSelectScreen} backgroundColor={"purple"} >Exercise 1#</ThemedButton>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({

  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonLayout : {
    flexDirection: 'row',
    padding: 10,

  },

  textStyle : {
    fontSize: 20,
    padding: 10,
    fontFamily: 'OpenDyslexic',
  },
})