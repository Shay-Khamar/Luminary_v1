import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CalibrationScreen from '../../Displays/CalibrationScreen';
import ExerciseButton from '../../Buttons/ExerciseButton';
import Exercise2DisplayBox from '../../Displays/Exercise2DisplayBox';

const SomethingElse = () => {
  const [active, setActive] = useState(false);

  

  return (
    <View style={styles.container}>
      <Exercise2DisplayBox />
    

    </View>
  );
};

export default SomethingElse;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  randomButton: {
    backgroundColor: 'rgb(52, 152, 219)',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});