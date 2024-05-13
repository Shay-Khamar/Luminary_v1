import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useResults } from '../../misc/ResultContext';
import colours from '../../../colours';
import { ThemedButton } from 'react-native-really-awesome-button';
import { useNavigation } from '@react-navigation/native';

/**
 * Represents the ResultScreen component.
 * This component displays the results of the user's exercises.
 * @returns {JSX.Element} JSX for the ResultScreen component.
 */
const ResultScreen = () => {
  const {exerciseData, resetResults} = useResults();

  const navigation = useNavigation();

  /**
   * Navigates back to the home screen.
   * Resets the results before navigating home.
   */
  const goHome = () => {
    resetResults();  // Reset the results before navigating home
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
    navigation.navigate('Home');
  };

  /**
   * Renders the results of the user's exercises based on the exercise type.
   * @returns {JSX.Element} JSX representing the exercise results.
   */
  const renderResults = () => {
    switch(exerciseData.exerciseType){
      case  'Exercise1':
        return (
          <View>
            <Text style={styles.text}>WPM: {Math.floor(exerciseData.results.wpm)}</Text>
            <Text style={styles.text}>Score:{exerciseData.results.score} / {exerciseData.results.tq}</Text>
          </View>
        );
      case 'Exercise2':
        return (
          <View>
            <Text style={styles.text}>Rate:{(exerciseData.results.rate.toFixed(2))} items/sec</Text>
            <Text style={styles.text}>Average Response Time: {(exerciseData.results.responseTime.toFixed(2))} ms</Text>
            <Text style={styles.text}>Errors: {Math.floor(exerciseData.results.errors)}</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headrContainer}>
        <Text style={styles.header}>Results</Text>
      </View>
      <View style={styles.resultsContainer}>
        {renderResults()}
        <ThemedButton name="bruce" onPressIn={goHome} width={250} height={115}  type="secondary" textSize={40} borderRadius={25} backgroundColor={colours.accent}>Home</ThemedButton>
      </View>
    </View>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        color: colours.background,
    },

    header: {
      fontSize: 60,
      fontFamily: '',
      color: colours.accent,
    },

    headrContainer: {
      alignItems: 'center',
      marginTop: '2%',
    } ,

    text: {
        fontSize: 60,
        fontWeight: 'bold',
        color: colours.text,
    },

    resultsContainer : {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
});