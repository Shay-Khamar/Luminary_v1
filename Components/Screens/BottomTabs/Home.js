import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {ThemedButton} from "react-native-really-awesome-button";
import { useNavigation } from '@react-navigation/native';
import ReadingCatalogue from '../Stacks/ReadingCatalogue';
import ExerciseButton from '../../Buttons/ExerciseButton';
import Exercise2 from '../Stacks/Exercise2';
import colours from '../../../colours';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';



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
    <View style={styles.headerContainer}>
      <Text style={styles.textStyle}>Welcome to <Text style={styles.luminaryText}>LUMINARY</Text></Text>
    </View>
    <View style={styles.buttonContainer}>
      <ExerciseButton onPress={Exercise2} Title="SPEED TASK" children={<FontAwesome5 name="running" size={50} color="black" />}/>
      <ExerciseButton onPress={ExtractSelectScreen} Title="READING Task" children={<Entypo name="open-book" size={50} color={colours.text} />}/>
    </View>
  </View>
);
}

export default Home;

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: colours.background,
},
headerContainer: {
  alignSelf: 'flex-start', // Aligns the header to the top left
  marginTop: 20, // Optionally adjust top margin
  marginLeft: 20, // Optionally adjust left margin
},
buttonContainer: {
  flex: 1, // Takes up all remaining space
  justifyContent: 'center', // Centers buttons vertically
  alignItems: 'center', // Centers buttons horizontally
  flexDirection: 'row', // Arranges buttons in a row
},
textStyle: {
  fontSize: 40,
  fontFamily: 'Lexend',
  color: colours.text,
},
luminaryText: {
  fontSize: 60,
  color: colours.accent,
},
});