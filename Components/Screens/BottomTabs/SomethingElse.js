import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CalibrationScreen from '../../Displays/CalibrationScreen';

const SomethingElse = () => {
  const [active, setActive] = useState(false);

  const calibrationToggle = () => {
    setActive(true); // This will show the CalibrationScreen when button is pressed
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={calibrationToggle} style={styles.randomButton}>
        <Text>Start Calibration</Text>
      </TouchableOpacity>
      {active && (
        <CalibrationScreen calibrationActive={active} />
      )}
    </View>
  );
};

export default SomethingElse;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgb(155, 89, 182)',
  },
  randomButton: {
    backgroundColor: 'rgb(52, 152, 219)',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});