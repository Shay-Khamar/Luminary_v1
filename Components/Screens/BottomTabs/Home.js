import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {ThemedButton} from "react-native-really-awesome-button";
import { useNavigation } from '@react-navigation/native';
import ReadingCatalogue from '../Stacks/ReadingCatalogue';
import ExerciseButton from '../../Buttons/ExerciseButton';
import Exercise2 from '../Stacks/Exercise2';
import colours from '../../../colours';


const Home = () => {

const navigation = useNavigation();

const Exercise2 = () => {
  navigation.navigate('Exercise2');
}

const ExtractSelectScreen = () => {
  navigation.navigate('ReadingCatalogue');
}
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Welcome To Luminary !</Text>
      <View style={styles.buttonLayout}>
      <ExerciseButton onPress={Exercise2} Title="SPEED TASK"/>
      <ExerciseButton onPress={ExtractSelectScreen} Title="Comprehension Task"/>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({

  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.background,
  },

  buttonLayout : {
    flexDirection: 'row',


  },

  textStyle : {
    fontSize: 20,
    padding: 10,
    fontFamily: 'OpenDyslexic',
    color: colours.text,
  },
})